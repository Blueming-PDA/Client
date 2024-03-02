import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Link, redirect, useNavigate } from "react-router-dom";
import { fetchMypageBoardList } from "../../../lib/apis/board";
import PasswordChangeModal from "./PasswordChangeModal";
import ProfileModal from "./ProfileModal";
import { fetchLogout } from "../../../lib/apis/auth";
import { logout } from "../../../store/reducers/user";
import { Form } from "react-bootstrap";
import "./MyPage.css";
import { setSid } from "../../socket/socketEvents";
import {
  fetchChangeProfileImage,
  fetchGetProfileImage,
} from "../../../lib/apis/profile";
import profile1 from "/profile/9334178.jpg";

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [MypageBoardList, setMyPageBoardList] = useState([]);
  const [filteredBoardData, setFilteredBoardData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const postsPerPage = 5;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  useEffect(() => {
    console.log("userObj" + userObj);
    if (userObj) {
      setSid(userObj);
    }
  }, []);
  // console.log(userObj);

  //페이지 초기 세팅
  useEffect(() => {
    console.log(userObj);
    fetchMypageBoardList(userObj._id).then((data) => {
      setMyPageBoardList(data);
      setFilteredBoardData(data);
    });
    console.log("hello");
    fetchGetProfileImage(userObj._id).then((data) => {
      console.log("data입");
      console.log(data);
      setSelectedImage(data);
    });
  }, []);

  // 모달을 표시하는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // 모달을 숨기는 함수 (PasswordChangeModal 컴포넌트에 전달)
  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  // 모달프로필을 보여주는 함수
  const handleShowProfileModal = () => {
    setShowProfileModal(true);
  };

  // 모달프로필을 숨기는 함수
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  //보드 검색해서 띄우는 함수
  const handleSearch = () => {
    const filteredData = MypageBoardList.filter((data) =>
      data.boardTitle.toLowerCase().includes(search.toLowerCase())
    );
    // console.log(filteredBoardData);
    setFilteredBoardData(filteredData);
    setPage(1);
  };

  const handleSelectPicture = (newImage) => {
    setSelectedImage(newImage); // 선택한 이미지로 세팅
    setShowProfileModal(false); // 모달 닫기
    fetchChangeProfileImage(userObj._id, newImage);
  };

  function onKeyUp(e) {
    if (e.key === "Enter") {
      handleSearch();
      setPage(1);
    }
  }

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBoardData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <Container className="myPageContainer">
      <Row>
        <Col xs={12} md={6} className="text-center">
          <div style={{ width: "90%" }}>
            {/* 프로필 사진과 내 정보 */}
            <img
              src={selectedImage}
              alt="Profile"
              className="profileImage"
              onClick={handleShowProfileModal}
            />

            <div className="myInfoBox">
              <div
                className="infoContents"
                style={{ marginLeft: "30px", textAlign: "left" }}
              >
                <p>
                  <strong>Email </strong>
                  {userObj.email}
                </p>
                <p>
                  <strong>Name </strong> {userObj.name}
                </p>
                <p>
                  <strong>Phone </strong> {userObj.phone}
                </p>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ marginLeft: "30px", marginBottom: "20px" }}
              >
                <Button className="passwordbtn" onClick={handleShowModal}>
                  <span className="passwordbtnName">비밀번호 변경</span>
                </Button>
                <span className="passwordContent">
                  비밀번호 변경시,<br></br> 비밀번호 재입력이 필요합니다.
                </span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} className="searchLayout">
          <div style={{ width: "90%" }}>
            {/* 내가 쓴 글 목록 */}
            <Container className="min-vh-100">
              {/* ... 검색 바 및 리스트 그룹 ... */}
              {/* 검색 바 */}
              <div className="search-bar">
                <Form.Control
                  className="me-2"
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={onKeyUp}
                />
                <Button
                  className="searchbtn"
                  onClick={() => {
                    handleSearch();
                    setPage(1);
                  }}
                >
                  검색
                </Button>
              </div>
              {/* 글 목록 */}
              <ListGroup
                className="board-list"
                as="ul"
                style={{ marginTop: "10px" }}
              >
                {currentPosts.length === 0 ? (
                  <span>작성한 글이 없습니다.</span>
                ) : (
                  <></>
                )}
                {currentPosts.map((item, index) => (
                  <Link
                    key={index}
                    to={`/board/${item._id}`}
                    className="text-decoration-none"
                  >
                    <ListGroup.Item
                      key={index}
                      as="li"
                      action
                      className="d-flex justify-content-between align-items-start rounded extended-list-item"
                    >
                      <div className="ms-2 me-auto text-truncate">
                        <div className="fw-bold">{item.boardTitle}</div>
                      </div>
                      <div>
                        <div>
                          {new Date(item.createdAt).toISOString().split("T")[0]}
                        </div>
                      </div>
                    </ListGroup.Item>
                  </Link>
                ))}
              </ListGroup>

              {/* 페이지네이션 */}
              <PaginationControl
                page={page}
                between={4}
                total={filteredBoardData.length}
                limit={postsPerPage}
                changePage={(page) => setPage(page)}
                ellipsis={1}
              />
            </Container>
          </div>
        </Col>
      </Row>
      {/* 비밀번호 변경 모달 */}
      <PasswordChangeModal show={showModal} onHide={handleCloseModal} />
      <ProfileModal
        show={showProfileModal}
        onHide={handleCloseProfileModal}
        onSelectPicture={handleSelectPicture}
      />
    </Container>
  );
};

export default ProfilePage;

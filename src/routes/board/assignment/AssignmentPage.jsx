import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { fetchBoardList, fetchBoardCommentList } from "~/lib/apis/board";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import point from "/point.png";
import { timeAgo } from "../board/BoardPage";
import { setSid } from "../../socket/socketEvents";

export default function AssignmentPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [boardData, setBoardData] = useState([]);
  const [filteredBoardData, setFilteredBoardData] = useState([]);
  const postsPerPage = 5;
  const boardType = "assignment";

  let userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  let userId;
  let userAdmin;
  if (userObj) {
    userId = userObj._id;
    userAdmin = userObj.admin;
  } else {
    userId = "trash";
  }

  const callCommentData = async (boardId) => {
    try {
      if (boardId !== undefined) {
        const comments = await fetchBoardCommentList(boardType, boardId);

        const filteredComments = comments.comments.filter(
          (comment) => comment.commentContent !== "삭제된 댓글입니다."
        );
        return filteredComments.length;
      }
    } catch (error) {
      console.error("댓글 데이터 호출 중 에러:", error);
    }
  };

  const callBoardData = async () => {
    try {
      const response = await fetchBoardList(boardType);
      const boardDataWithComments = await Promise.all(
        response.reverse().map(async (board) => {
          const commentCount = await callCommentData(board._id);
          return { ...board, commentCount };
        })
      );
      setBoardData(boardDataWithComments);
      setFilteredBoardData(boardDataWithComments);
    } catch (error) {
      console.error("보드 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callBoardData();
    callCommentData();
  }, []);

  const handleSearch = () => {
    const filteredData = boardData.filter((data) =>
      data.boardTitle.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredBoardData(filteredData);
    setPage(1);
  };

  function onKeyUp(e) {
    if (e.key == "Enter") {
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
    <Container className="board-page">
      <img
        src={point}
        width="65"
        className="d-inline-block align-top-img"
        alt="Blueming point"
      />

      <div className="board-name">과제함</div>
      <div className="search-bar">
        <Form.Control
          className="search-form"
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => onKeyUp(e)}
        />
        <Button
          className="search-btn"
          onClick={() => {
            handleSearch();
            setPage(1);
          }}
        >
          검색
        </Button>
      </div>
      <div className="write-board">
        {userObj !== null ? (
          <Link
            to={`/assignment/write`}
            preventScrollReset
            className="text-decoration-none"
          >
            <Button className="write-board-btn">작성</Button>
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="board-list">
        {currentPosts.map((data, index) => (
          <div>
            {userId === data.userId || userAdmin === 1 ? (
              <Link
                to={`/assignment/${data._id}`}
                key={data._id}
                preventScrollReset
                className="text-decoration-none"
              >
                <div key={index} className="board">
                  <div className="board-tags">
                    {data.tag &&
                      data.tag.map((boardTag) => (
                        <div className="board-tag">{boardTag}</div>
                      ))}
                  </div>

                  <div className="board-title">
                    {"🔒 "}
                    {data.boardTitle}{" "}
                  </div>

                  <div className="board-comment-writer-date">
                    <div className="board-comment">
                      {data.commentCount ? "💬 " + data.commentCount : "💬 0"}
                    </div>
                    <div className="writer-date">
                      <strong>
                        {data.isAnonymous ? "익명" : data.userName}
                      </strong>{" "}
                      | {timeAgo(data.updatedAt)}{" "}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                className="assignment-btn"
                onClick={() => alert("작성자만 볼 수 있는 글입니다!")}
              >
                <div key={index} className="board">
                  <div className="board-tags">
                    {data.tag &&
                      data.tag.map((boardTag) => (
                        <div className="board-tag">{boardTag}</div>
                      ))}
                  </div>

                  <div className="board-title">
                    {"🔒 "}
                    {data.boardTitle}{" "}
                  </div>

                  <div className="board-comment-writer-date">
                    <div className="board-comment">
                      {data.commentCount ? "💬 " + data.commentCount : "💬 0"}
                    </div>
                    <div className="writer-date">
                      <strong>
                        {data.isAnonymous ? "익명" : data.userName}
                      </strong>{" "}
                      | {timeAgo(data.updatedAt)}{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <PaginationControl
        page={page}
        between={4}
        total={filteredBoardData.length}
        limit={postsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </Container>
  );
}

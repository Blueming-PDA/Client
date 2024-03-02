import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Stack,
  Badge,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BoardApi from "~/lib/apis/board";
import point from "/point.png";

export default function BoardWritePage() {
  const navigate = useNavigate();
  const params = useParams();
  const boardId = params.boardId;

  const userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  const userId = userObj._id;
  const userName = userObj.name;

  const [newBoard, setNewBoard] = useState({
    boardType: "board",
    boardTitle: "",
    boardContent: "",
    boardFile: "",
    isAnonymous: 0,
    tag: [],
    userId: "",
    userName: "",
  });

  const { boardType, boardTitle, boardContent, boardFile, isAnonymous } =
    newBoard;

  const fetchBoardData = async (boardId) => {
    try {
      const boardData = await BoardApi.fetchBoardDetail(boardType, boardId);
      setNewBoard(boardData);
      setSelectedTags(boardData.tag);
    } catch (err) {
      console.error("Error fetching board data:", err);
    }
  };

  const toggleAnoymous = () => {
    setNewBoard((prev) => ({
      ...prev,
      isAnonymous: prev.isAnonymous ? 0 : 1,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBoard((prev) => ({
      ...prev,
      [name]: value,
      userId: userId,
      userName: userName,
    }));
  };

  const handleWriteBoard = async () => {
    try {
      if (boardTitle.trim() === "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (boardContent.trim() === "") {
        alert("내용을 입력해주세요.");
      } else if (selectedTags.length === 0) {
        alert("태그를 선택해주세요.");
        return;
      }
      if (!boardId) {
        // 게시글 등록
        await BoardApi.fetchBoardWrite(boardType, newBoard);
      } else {
        // 게시글 수정
        await BoardApi.fetchBoardEdit(boardType, boardId, newBoard);
      }
      navigate(-1);
    } catch (err) {
      console.error("Error posting board:", err);
    }
  };

  const tags = ["질문", "잡담"];
  const [selectedTags, setSelectedTags] = useState([]);
  const handleSelectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    // url에 boardId 있으면 board data 가져옴
    if (boardId) {
      fetchBoardData(boardId);
    }
  }, [boardId]);

  useEffect(() => {
    setNewBoard((prev) => ({
      ...prev,
      tag: selectedTags,
    }));
  }, [selectedTags]);

  // 파일 업로드
  const FileUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log("키키");
    for (const key of formData) console.log(key);
  };

  return (
    <Container className="min-vh-100">
      <img
        src={point}
        width="65"
        className="d-inline-block align-top-img"
        alt="Blueming point"
      />
      <div className="board-name">
        {boardId ? "게시글 수정" : "게시글 작성"}
      </div>

      <Form>
        <fieldset>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="writeForm.title.input"
          >
            <Form.Label column sm={1}>
              Title:
            </Form.Label>
            <Col sm={11}>
              <Form.Control
                type="text"
                name="boardTitle"
                value={boardTitle}
                placeholder="제목을 입력해주세요."
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <Stack direction="horizontal" gap={2}>
                <span>Tags:</span>
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    pill
                    bg={selectedTags.includes(tag) ? "primary" : "secondary"}
                    onClick={() => handleSelectTag(tag)}
                    style={{ cursor: "pointer" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </Stack>
            </div>

            {/* 파일 업로드 */}
            <Form.Group controlId="formFile" className="mb-0">
              <Form.Control
                type="file"
                className="shadow-none"
                accept="image/*"
                size="sm"
                style={{ width: "200px" }}
                onChange={(e) => {
                  FileUpload(e);
                }}
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="writeForm.content.input">
            <Form.Control
              as="textarea"
              rows={7}
              name="boardContent"
              value={boardContent}
              placeholder="상단의 태그를 선택하고 내용을 입력해주세요."
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-end"
            id="formCheckbox"
          >
            <Form.Check
              type="checkbox"
              label="익명"
              checked={isAnonymous === 1}
              onChange={toggleAnoymous}
              size="sm"
              style={{ width: "60px" }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mb-3">
            <Button type="button" onClick={handleWriteBoard}>
              {boardId ? "수정" : "작성"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
}

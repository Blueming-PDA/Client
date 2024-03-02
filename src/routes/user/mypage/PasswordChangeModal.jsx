// PasswordChangeModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatePassword } from "../../../lib/apis/auth";

const PasswordChangeModal = ({ show, onHide }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNewPasswordConfirmChange = (e) => {
    setNewPasswordConfirm(e.target.value);
  };

  const handlePasswordUpdate = () => {
    // 비밀번호가 서로 다르면 에러 메시지를 설정합니다.
    if (newPassword !== newPasswordConfirm) {
      alert("새로운 비밀번호가 일치하지 않습니다.");
      return; // 함수를 여기서 종료합니다.
    }

    const userId = userObj._id;
    fetchUpdatePassword({ newPassword, userId })
      .then((data) => {
        // console.log(data);
        onHide();
      })
      .catch((error) => {
        // API 호출 실패 시 에러 처리
        console.error("비밀번호 변경 중 오류가 발생했습니다: ", error);
        alert("비밀번호 변경 실패");
      });
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              as={Row}
              controlId="formCurrentPassword"
              className="mb-3"
            >
              <Form.Label column sm={4}>
                현재 비밀번호
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="현재 비밀번호 입력"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formNewPassword" className="mb-3">
              <Form.Label column sm={4}>
                변경 비밀번호
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="새로운 비밀번호 입력"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formNewPasswordConfirm"
              className="mb-3"
            >
              <Form.Label column sm={4}>
                변경 비밀번호 재입력
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="새로운 비밀번호 재입력"
                  value={newPasswordConfirm}
                  onChange={handleNewPasswordConfirmChange}
                />
              </Col>
            </Form.Group>
            <div className="mb-4"></div>{" "}
            {/* 여기에 margin bottom 으로 공백을 조절합니다. */}
            <div className="text-center">
              <Button variant="primary" onClick={handlePasswordUpdate}>
                확인
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PasswordChangeModal;

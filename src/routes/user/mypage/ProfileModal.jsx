// ProfileModal.jsx
import React from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";

const ProfilePictures = [
  "/profile/9334178.jpg",
  "/profile/9334183.jpg",
  "/profile/9334240.jpg",
  "/profile/9334407.jpg",
];

const ProfileModal = ({ show, onHide, onSelectPicture }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>프로필 사진 선택</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row xs={1} md={2} className="g-4">
          {ProfilePictures.map((picture, index) => (
            <Col key={index}>
              <Image
                src={picture}
                thumbnail
                onClick={() => onSelectPicture(picture)} // 이미지 선택 핸들러
              />
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;

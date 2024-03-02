import React, { useCallback, useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { emitMessage } from "../socket/socketEvents";

export default function Question({ handleShowQuestion }) {
  const [question, setQuestion] = useState("");
  const [showQuestionInput, setShowQuestionInput] = useState(false);

  const handleShowQuestionInput = () => {
    setShowQuestionInput((prev) => !prev);
  };

  const onSubmit = useCallback(
    (question) => {
      emitMessage(question);
      handleShowQuestion();
    },
    [handleShowQuestion]
  );

  return (
    <Modal show={true} onHide={handleShowQuestion} centered>
      <Modal.Header closeButton>
        <Modal.Title>질문하기</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(question);
        }}
      >
        <Modal.Body>
          <Container>
            <Row className="mb-2">
              <Col xs={6}>
                <Button
                  block
                  onClick={() => {
                    const questionText = "코드를 다시 보여주세요";
                    setQuestion(questionText);
                    onSubmit(questionText);
                  }}
                >
                  ⌨️ 코드를 다시 보여주세요
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  block
                  onClick={() => {
                    const questionText = "너무 빨라요";
                    setQuestion(questionText);
                    onSubmit(questionText);
                  }}
                >
                  😥 너무 빨라요
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Button
                  block
                  onClick={() => {
                    const questionText = "다시 한번 설명해 주세요";
                    setQuestion(questionText);
                    onSubmit(questionText);
                  }}
                >
                  🥺 다시 한번 설명해 주세요
                </Button>
              </Col>
              <Col xs={6}>
                <Button block onClick={handleShowQuestionInput}>
                  ✏️ 질문을 입력할게요
                </Button>
              </Col>
            </Row>
          </Container>

          {showQuestionInput && (
            <Form.Group className="mt-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="질문을 입력하세요"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Button type="submit" className="mt-2">
                ✔️ 입력
              </Button>
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "white" }}
            onClick={handleShowQuestion}
          >
            취소
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

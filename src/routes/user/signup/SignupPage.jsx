import React, { useCallback, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { fetchSignup } from "../../../lib/apis/auth";
import { redirect, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import point from "/point.png";

export default function SignUpPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const navigate = useNavigate();

  const onInputChange = useCallback((inputText, setFn) => {
    setFn(inputText);
  }, []);

  const onRegisterSubmit = useCallback(
    (email, password, name, phone, admin) => {
      fetchSignup({ email, password, name, phone, admin }).then((data) => {
        // console.log(data);
        navigate("/users/login");
      });
    },
    [navigate]
  );

  return (
    <Container className="min-vh-100  d-flex flex-column justify-content-center align-items-center">
      <div style={{ width: "100%", maxWidth: 640 }}>
        <img className="logo" alt="point" src={point} />
        <h3 style={{ alignSelf: "start" }}> 환영합니다!</h3>
        <span className="content">
          교육의 아름다운 정원, 블루밍에 오신 것을 축하합니다 🌷✨<br></br>
          블루밍과 함께 스스로의 학습 여정을 개척하고, 성장해보세요 <br></br>
          함께 성장하는 우리의 정원에서 여러분을 기다리고 있겠습니다
        </span>
        <br></br>
        <br></br>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            onChange={(e) => {
              onInputChange(e.target.value, setUserEmail);
            }}
            type="email"
            placeholder="name@example.com"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            onChange={(e) => {
              onInputChange(e.target.value, setUserPassword);
            }}
            type="password"
            placeholder="Password"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingNickname"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => {
              onInputChange(e.target.value, setUserName);
            }}
            placeholder="이름을 입력하여 주세요."
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingNickname"
          label="Phone"
          className="mb-3"
        >
          <Form.Control
            type="text"
            onChange={(e) => {
              onInputChange(e.target.value, setUserPhone);
            }}
            placeholder="전화번호를 입력하여 주세요."
            required
          />
        </FloatingLabel>
        <div>
          <br />
        </div>
        <Button
          className="signupbtn"
          onClick={(e) => {
            e.preventDefault();
            onRegisterSubmit(userEmail, userPassword, userName, userPhone);
          }}
        >
          회원가입
        </Button>
      </div>
    </Container>
  );
}

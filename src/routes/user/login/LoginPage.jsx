import React, { useCallback, useContext, useState, useEffect } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { redirect, useNavigate, Link } from "react-router-dom";
import { fetchLogin } from "../../../store/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.css";
import point from "/point.png";

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onInputChange = useCallback((inputText, setFn) => {
    setFn(inputText);
  }, []);

  const userObj = useSelector((state) => {
    return state.user;
  });
  // console.log(userObj);

  useEffect(() => {
    if (userObj.isLoggedIn === true) {
      alert("이미 로그인 되었습니다!");
      navigate("/main");
    }
  }, []);

  const onSubmitLogin = useCallback(
    (email, password) => {
      dispatch(fetchLogin({ email, password }))
        .then((resp) => {
          // console.log(resp);
          if (resp.payload.token) {
            navigate("/main");
            //resp.token = user
            delete resp.payload.token;
            // socket.emit("login", email, (res) => {
            //   console.log("Socket-Res", res)
            // })
          }
        })
        .catch((error) => {
          console.log("Login Error");
        });
    },
    [dispatch, navigate]
  );

  return (
    <Container className="appContainer">
      <div style={{ width: "100%", maxWidth: 640 }}>
        <img className="logo" alt="point" src={point} />
        <h1
          className="title"
          style={{ fontWeight: "bold", alignSelf: "start" }}
        >
          {" "}
          한계 없는 학습의 정원, <br></br>
          블루밍에서 당신의 잠재력을 꽃피우세요!
        </h1>
        <br />
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            onChange={(e) => {
              onInputChange(e.target.value, setUserEmail);
            }}
            value={userEmail}
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
            value={userPassword}
            type="password"
            placeholder="Password"
            required
          />
        </FloatingLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "8px",
            justifyItems: "end",
          }}
        >
          <Link to="/users/signup">
            <Button className="loginbtn" style={{ flex: "1" }}>
              회원가입
            </Button>
          </Link>
          <Button
            className="loginbtn"
            onClick={(e) => {
              e.preventDefault();
              onSubmitLogin(userEmail, userPassword);
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    </Container>
  );
}

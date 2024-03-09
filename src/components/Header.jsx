// Header.js
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/user";
import { fetchLogout } from "../lib/apis/auth";
import { writeHeaderMessage } from "../lib/apis/headerMessage";
import { getHeaderMessage } from "../lib/apis/headerMessage";
import {
  emitHeaderMessage,
  onHeaderMessageBack,
} from "../routes/socket/socketEvents";
import socket from "../routes/socket/socket";

import logo from "/b-logo.png";
import { Link } from "react-router-dom";
import { fetchGetProfileImage } from "../lib/apis/profile";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  let userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  const [headerMessage, setHeaderMessage] = useState({
    headerMessage: "",
    userId: "",
    userName: "",
  });

  const handleWriteMessage = async (newMessage) => {
    const updatedHeaderMessage = {
      userId: userObj._id,
      headerMessage: newMessage,
      userName: userObj.name,
    };

    setHeaderMessage(updatedHeaderMessage);
    await writeHeaderMessage(updatedHeaderMessage);
  };

  function onKeyUp(e) {
    if (e.key === "Enter") {
      console.log(e.target.value);
      handleWriteMessage(e.target.value);
    }
  }

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        await fetchLogout();
        dispatch(logout());

        alert("로그아웃 되었습니다.");
        navigate("/users/login");
      } catch (error) {
        console.error("로그아웃 처리 중 오류가 발생했습니다:", error);
      }
    }
  };

  useEffect(() => {
    const fetchHeaderMessage = async () => {
      try {
        const headerMsg = await getHeaderMessage();
        if (headerMsg) {
          setMessage(headerMsg);
        }
      } catch (error) {
        console.error("헤더 메시지 조회 중 오류가 발생했습니다:", error);
      }
    };

    fetchHeaderMessage(); // 호출
  }, []);

  return (
    <Navbar
      className="header-top"
      fixed="top"
      style={{
        height: "9%",
        backgroundColor: "white",
      }}
    >
      <Link to="/main">
        <img
          src={logo}
          width="200px"
          className="logo-img"
          alt="Blueming logo"
          style={{ marginLeft: "30px" }}
        />
      </Link>
      <Navbar.Collapse className="justify-content-end" style={{}}>
        <Form
          className="mr-2"
          style={{ marginRight: "10px" }}
          onSubmit={(e) => e.preventDefault()}
        >

          {userObj ? (
            <FormControl
              className="write-message"
              type="text"
              placeholder={message}
              onKeyUp={(e) => onKeyUp(e)}
              style={{
                backgroundColor: "white",
                border: "thin solid lightgray",
                width: "30vw",
              }}
            />
          ) : (
            <FormControl
              className="write-message"
              type="text"
              placeholder={message}
              onKeyUp={(e) => onKeyUp(e)}
              disabled
              style={{
                border: "thin solid lightgray",
                width: "30vw",
              }}
            />
          )}
        </Form>

        {user.isLoggedIn && user.userInfo ? (
          <div style={{ display: "flex", marginRight: "20px" }}>
            <Nav.Link href="/users/mypage">
              <div style={{ fontSize: "17px" }}>✌️ {user.userInfo.name}님</div>
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <div style={{ fontSize: "17px" }}>🚪 로그아웃</div>
            </Nav.Link>
          </div>
        ) : (
          <div style={{ marginRight: "20px" }}>
            <Nav.Link href="/users/login">
              <div style={{ fontSize: "17px" }}>👋 로그인</div>
            </Nav.Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

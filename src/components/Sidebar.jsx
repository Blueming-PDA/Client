// Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ciLogo from "/ci-logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div style={{ position: "relative", marginLeft: "3%" }}>
      <Nav
        defaultActiveKey="/home"
        className="my-sidebar flex-column"
        style={{
          position: "sticky",
          top: "15%",
          bottom: "0",
          left: "0",
          height: "330px",
          width: "200px",
          overflow: "auto",
          backgroundColor: "white",
          color: "black",
          zIndex: 1,
          margin: "100% 0",
          borderRadius: "15px",
        }}
      >
        {/* <Link to="/">
          <img src={logo} width="60" className="logo-img" alt="Blueming logo" />
        </Link> */}
        <Nav.Link
          href="/main"
          className="nav-link"
          style={{ color: "#5D5D5D", fontWeight: "normal", fontSize: "19px" }}
        >
          메인화면
        </Nav.Link>
        <Nav.Link
          href="/board"
          className="nav-link"
          style={{ color: "#5D5D5D", fontWeight: "normal", fontSize: "19px" }}
        >
          게시판
        </Nav.Link>
        <Nav.Link
          href="/assignment"
          className="nav-link"
          style={{ color: "#5D5D5D", fontWeight: "normal", fontSize: "19px" }}
        >
          과제함
        </Nav.Link>
        <Nav.Link
          href="/notice"
          className="nav-link"
          style={{ color: "#5D5D5D", fontWeight: "normal", fontSize: "19px" }}
        >
          공지사항
        </Nav.Link>
        <Nav.Link
          href="https://github.com/Blueming-PDA/Blueming/blob/docs/README.md"
          className="nav-link"
          target="_blank"
          style={{ color: "#5D5D5D", fontWeight: "normal", fontSize: "19px" }}
        >
          소개
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;

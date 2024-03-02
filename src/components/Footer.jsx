// Footer.js
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Footer.css";
import github from "/github.svg"

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="light" variant="dark">
      <Container>
        <Navbar.Text className="footer-copyright-text">
          &copy; 2024. Blueming Co. All Rights Reserved.
        </Navbar.Text>
        <Navbar.Text className="footer-github-text">
          <a href="https://github.com/Blueming-PDA/Blueming" target="_blank">
            <img className="github-img" src={github} width="25" alt="github icon" />
            Github Link
          </a>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;

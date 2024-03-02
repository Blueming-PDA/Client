// MainLayout.js
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Alarm from "../routes/question/Alarm";

export default function MainLayout() {
  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header />

          <Container
            style={{
              backgroundColor: "#f5f6ff",
              maxWidth: "1120px",
            }}
          >
            <Outlet />
          </Container>
          <Footer />
        </div>
      </div>
      <Alarm />
    </>
  );
}

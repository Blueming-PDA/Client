import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/components/MainLayout";

import MainPage from "~/routes/MainPage";
import LoginPage from "~/routes/user/login/LoginPage";
import SignupPage from "~/routes/user/signup/SignupPage";
import MyPage from "~/routes/user/mypage/MyPage";

import AssignmentPage from "~/routes/board/assignment/AssignmentPage";
import AssignmentDetailPage from "~/routes/board/assignment/detail/AssignmentDetailPage";
import AssignmentWritePage from "~/routes/board/assignment/write/AssignmentWritePage";
import BoardPage from "~/routes/board/board/BoardPage";
import BoardDetailPage from "~/routes/board/board/detail/BoardDetailPage";
import BoardWritePage from "~/routes/board/board/write/BoardWritePage";
import NoticePage from "~/routes/board/notice/NoticePage";
import NoticeDetailPage from "~/routes/board/notice/detail/NoticeDetailPage";
import NoticeWritePage from "~/routes/board/notice/write/NoticeWritePage";

export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <LoginPage />,
  },
  {
    path: "",
    element: <MainLayout />,
    children: [

      {
        path: "/main",
        index: true,
        element: <MainPage />,
      },
      {
        path: "/users/mypage",
        element: <MyPage />,
        index: true,
      },
      {
        path: "/assignment",
        children: [
          {
            path: "",
            index: true,
            element: <AssignmentPage />,
          },
          {
            path: ":boardId",
            index: true,
            element: <AssignmentDetailPage />,
          },
          {
            path: "write",
            index: true,
            element: <AssignmentWritePage />,
          },
          {
            path: ":boardId/edit",
            index: true,
            element: <AssignmentWritePage />,
          },
        ],
      },
      {
        path: "/board",
        children: [
          {
            path: "",
            index: true,
            element: <BoardPage />,
          },
          {
            path: ":boardId",
            index: true,
            element: <BoardDetailPage />,
          },
          {
            path: "write",
            index: true,
            element: <BoardWritePage />,
          },
          {
            path: ":boardId/edit",
            index: true,
            element: <BoardWritePage />,
          },
        ],
      },
      {
        path: "/notice",
        children: [
          {
            path: "",
            index: true,
            element: <NoticePage />,
          },
          {
            path: ":boardId",
            index: true,
            element: <NoticeDetailPage />,
          },
          {
            path: "write",
            index: true,
            element: <NoticeWritePage />,
          },
          {
            path: ":boardId/edit",
            index: true,
            element: <NoticeWritePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/users",
    children: [
      {
        path: "login",
        element: <LoginPage />,
        index: true,
      },
      {
        path: "signup",
        element: <SignupPage />,
        index: true,
      },
    ],
  },
]);

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import JoinPage from "pages/JoinPage";
import FeedPage from "pages/FeedPage";
import PostPage from "pages/PostPage";
import WritePage from "pages/WritePage";
import UserPage from "pages/UserPage";
import GroupPage from "pages/GroupPage";
import ErrorPage from "pages/ErrorPage";
import MainLayout from "components/common/MainLayout";
import SubLayout from "components/common/SubLayout";
import PrivateRoute from "pages/auth/PrivateRoute";
import NotPrivateRoute from "pages/auth/NotPrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/* 비로그인으로만 접근 가능 */}
        <Route element={<SubLayout />}>
          <Route
            path="login"
            element={
              <NotPrivateRoute>
                <LoginPage />
              </NotPrivateRoute>
            }
          />
          <Route
            path="join"
            element={
              <NotPrivateRoute>
                <JoinPage />
              </NotPrivateRoute>
            }
          />
        </Route>

        {/* 로그인해야 접근 가능 */}
        <Route element={<MainLayout />}>
          <Route
            path="post/:postid"
            element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="write"
            element={
              <PrivateRoute>
                <WritePage />
              </PrivateRoute>
            }
          />
          <Route
            path="user/:userid"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* 상관없이 접근 가능 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate replace to="main" />} />
          <Route path="main" element={<MainPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="group" element={<GroupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

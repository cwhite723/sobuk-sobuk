import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import JoinPage from "pages/JoinPage";
import FeedPage from "pages/FeedPage";
import PostPage from "pages/PostPage";
import WritePage from "pages/WritePage";
import UserPage from "pages/UserPage";
import SettingPage from "pages/SettingPage";
import GroupPage from "pages/GroupPage";
import ErrorPage from "pages/ErrorPage";
import MainLayout from "components/common/MainLayout";
import SubLayout from "components/common/SubLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate replace to="main" />} />
          <Route path="main" element={<MainPage />} />

          <Route path="feed" element={<FeedPage />} />
          <Route path="post/:postid" element={<PostPage />} />
          <Route path="write" element={<WritePage />} />

          <Route path="user/:userid" element={<UserPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="group" element={<GroupPage />} />
        </Route>

        <Route element={<SubLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="join" element={<JoinPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

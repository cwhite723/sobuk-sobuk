import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "pages/MainPage";
import LoginPage from "pages/Loginpage";
import JoinPage from "pages/JoinPage";
import FeedPage from "pages/FeedPage";
import PostPage from "pages/PostPage";
import WritePage from "pages/WritePage";
import UserPage from "pages/UserPage";
import SettingPage from "pages/SettingPage";
import GroupPage from "pages/GroupPage";
import ErrorPage from "pages/ErrorPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="main" />} />
        <Route path="main" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />

        <Route path="feed" element={<FeedPage />} />
        <Route path="post/:postid" element={<PostPage />} />
        <Route path="write" element={<WritePage />} />

        <Route path="user/:userid" element={<UserPage />} />
        <Route path="setting" element={<SettingPage />} />

        <Route path="group" element={<GroupPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

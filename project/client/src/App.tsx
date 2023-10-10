import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "pages/MainPage";
import LoginPage from "pages/Loginpage";
import JoinPage from "pages/JoinPage";
import FeedPage from "pages/FeedPage";
import DetailPage from "pages/DefailPage";
import WritePage from "pages/WritePage";
import MyPagePage from "pages/MyPagePage";
import SettingPage from "pages/SettingPage";
import GroupPage from "pages/GroupPage";
import ErrorPage from "pages/ErrorPage";

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<MainPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />

        <Route path="feed" element={<FeedPage />} />
        <Route path="detail/:postid" element={<DetailPage />} />
        <Route path="write" element={<WritePage />} />

        <Route path="mypage/:userid" element={<MyPagePage />} />
        <Route path="setting" element={<SettingPage />} />

        <Route path="group" element={<GroupPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

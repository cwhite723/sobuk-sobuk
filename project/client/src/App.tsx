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
import MainLayout from "components/layouts/MainLayout";
import SubLayout from "components/layouts/SubLayout";
import PrivateRoute from "pages/auth/PrivateRoute";
import NotPrivateRoute from "pages/auth/NotPrivateRoute";
import SearchPage from "pages/SearchPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* 비로그인으로만 접근 가능 */}
        <Route element={<NotPrivateRoute />}>
          <Route element={<SubLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="join" element={<JoinPage />} />
          </Route>
        </Route>

        {/* 로그인해야 접근 가능 */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="post/:postid" element={<PostPage />} />
            <Route path="write" element={<WritePage />} />
            <Route path="my" element={<UserPage />} />
            <Route path="user/:userid" element={<UserPage />} />
          </Route>
        </Route>

        {/* 상관없이 접근 가능 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate replace to="search" />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="group" element={<GroupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

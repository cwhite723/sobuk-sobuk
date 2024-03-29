import { Routes, Route, Navigate } from "react-router-dom";
import PlanPage from "components/pages/PlanPage";
import LogInPage from "components/pages/LogInPage";
import SignUpPage from "components/pages/SignUpPage";
import FeedPage from "components/pages/FeedPage";
import PostPage from "components/pages/PostPage";
import WritePage from "components/pages/WritePage";
import MemberPage from "components/pages/MemberPage";
import ChallengePage from "components/pages/ChallengePage";
import CreatePage from "components/pages/CreatePage";
import ChallengeDetailPage from "components/pages/ChallengeDetailPage";
import ErrorPage from "components/pages/ErrorPage";
import MainLayout from "components/layouts/MainLayout";
import SubLayout from "components/layouts/SubLayout";
import PrivateRoute from "components/pages/auth/PrivateRoute";
import NotPrivateRoute from "components/pages/auth/NotPrivateRoute";
import SearchPage from "components/pages/SearchPage";
import { QueryClient, QueryClientProvider } from "react-query";
import EditPage from "components/pages/EditPage";
import SettingPage from "components/pages/SettingPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 필요한 요청에 한해서 true로 설정
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* 비로그인으로만 접근 가능 */}
        <Route element={<NotPrivateRoute />}>
          <Route element={<SubLayout />}>
            <Route path="log-in" element={<LogInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
        </Route>

        {/* 로그인해야 접근 가능 */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="main" element={<PlanPage />} />
            <Route path="post/:postid" element={<PostPage />} />
            <Route path="write" element={<WritePage />} />
            <Route path="edit/:postid" element={<EditPage />} />
            <Route path="my" element={<MemberPage />} />
            <Route path="my-setting" element={<SettingPage />} />
            <Route path="member/:memberid" element={<MemberPage />} />
            <Route path="create" element={<CreatePage />} />
            <Route
              path="challenge/:challengeid"
              element={<ChallengeDetailPage />}
            />
          </Route>
        </Route>

        {/* 상관없이 접근 가능 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate replace to="search" />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="challenge" element={<ChallengePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

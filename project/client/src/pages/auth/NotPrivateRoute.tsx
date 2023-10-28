import { Navigate } from "react-router-dom";

const NotPrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? <Navigate to="../" /> : <>{children}</>;
};

export default NotPrivateRoute;

import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);

  if (cookies.tkn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

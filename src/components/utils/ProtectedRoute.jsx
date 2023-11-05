import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);

  const tkn = window.sessionStorage.getItem("tkn");
  console.log("TOKEN EN SESSION", tkn);
  console.log("cookies", cookies.tkn);
  if (!cookies.tkn && !tkn) {
    console.log("entra");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

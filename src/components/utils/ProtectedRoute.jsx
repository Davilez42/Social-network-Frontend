import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { UserContextProvider } from "../../context/userContext.js";
export default function ProtectedRoute() {
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);

  const tkn = window.sessionStorage.getItem("tkn");
  console.log("TOKEN EN SESSION", tkn);
  console.log("cookies", cookies.tkn);
  if (!cookies.tkn && !tkn) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      {" "}
      <UserContextProvider>
        <Outlet />;
      </UserContextProvider>
    </>
  );
}

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { UserContextProvider } from "../../context/userContext.jsx";
export default function ProtectedRoute() {
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);

  const tkn = window.sessionStorage.getItem("tkn");
  /*  console.log("TOKEN EN SESSION", tkn);
  console.log("cookies", cookies.tkn);
 */
  useEffect(() => {}, []);
  //!cookies.tkn && !tkn
  if (!cookies.tkn && !tkn) {
    return <Navigate to="/login" replace />;
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

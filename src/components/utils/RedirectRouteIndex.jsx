import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Index from "../../pages/Index";
import { jwtDecode } from "jwt-decode";

export default function RedirectRouteIndex() {
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);
  const tkn = window.sessionStorage.getItem("tkn");
  //!cookies.tkn && !tkn
  if (false) {
    return <Index />;
  }
  return <Navigate to={`/home/feed`} />;
}

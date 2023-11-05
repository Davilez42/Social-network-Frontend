import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Index from "../../pages/Index";
import { jwtDecode } from "jwt-decode";

export default function RedirectRouteIndex() {
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);
  const tkn = window.sessionStorage.getItem("tkn");
  console.log(tkn);
  if (!cookies.tkn && !tkn) {
    return <Index />;
  }
  const data = jwtDecode(cookies.tkn || tkn);
  return <Navigate to={`/home/feed`} />;
}

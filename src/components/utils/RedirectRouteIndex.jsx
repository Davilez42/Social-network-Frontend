import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Index from "../../pages/Index";
import { jwtDecode } from "jwt-decode";

export default function RedirectRouteIndex() {
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);

  if (!cookies.tkn) {
    return <Index />;
  }
  const data = jwtDecode(cookies.tkn);
  return <Navigate to={`/profile/edit/${data.id_user}`} replace />;
}

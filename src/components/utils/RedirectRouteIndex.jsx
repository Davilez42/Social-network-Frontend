import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import Index from "../../pages/Index";

export default function RedirectRouteIndex() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);
  const tkn = window.sessionStorage.getItem("tkn");
  //!cookies.tkn && !tkn
  if (!cookies.tkn && !tkn) {
    return <Index />;
  }
  return <Navigate to={`/home/feed`} />;
}

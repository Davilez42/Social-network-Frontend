import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import Index from "../../pages/Index";

export default function RedirectRouteIndex() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const sessionId = window.localStorage.getItem("sessionId");

  if (!cookies.tkn && !sessionId) {
    return <Index />;
  }
  return <Navigate to={`/home/feed`} />;
}

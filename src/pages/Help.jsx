import { Outlet } from "react-router-dom";
import "./help.css";
export default function Help() {
  return <div className="container_help">{<Outlet />}</div>;
}

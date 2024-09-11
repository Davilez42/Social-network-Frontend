import { Outlet } from "react-router-dom";
import "./profile.css";
export default function Profile() {
  return (
    <>
      <div className="container-profile">{<Outlet />}</div>
    </>
  );
}

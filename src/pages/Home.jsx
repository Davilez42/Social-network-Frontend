import { Outlet } from "react-router-dom";
import HeaderMain from "../components/feed/headermain/HeaderMain";
import "./home.css";
export default function Home() {
  return (
    <>
      <HeaderMain />
      <div className="container-main">{<Outlet />}</div>
    </>
  );
}

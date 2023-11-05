import { Outlet } from "react-router-dom";
import HeaderMain from "../components/feed/headermain/HeaderMain";
import { useContext } from "react";
import { UserContext } from "../context/userContextRegister";
import { ImCross } from "react-icons/im";
import "./home.css";
export default function Home() {
  const { info, setInfo } = useContext(UserContext);
  return (
    <>
      <HeaderMain />
      <div className="container-error">
        {info.map((e, i) => (
          <div key={i} className="box-error">
            <div>{e}</div>{" "}
            <ImCross
              className="icon-close"
              onClick={() => {
                setInfo([]);
              }}
            />
          </div>
        ))}
      </div>
      <div className="container-main">{<Outlet />}</div>
    </>
  );
}

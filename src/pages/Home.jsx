import { Outlet } from "react-router-dom";
import HeaderMain from "../components/feed/headermain/HeaderMain";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { ImCross } from "react-icons/im";
import NavBarSide from "../components/feed/navbarside/NavBarSide";
import "./home.css";
export default function Home() {
  const { info, setInfo } = useContext(UserContext);
  const [navbarSideView, setNavBarSide] = useState(true);

  useEffect(() => {
    setInfo([]);
    if (window.innerWidth <= 600) {
      setNavBarSide(false);
    }
  }, []);

  const switchNavbarSideView = () => {
    setNavBarSide(!navbarSideView);
  };

  return (
    <>
      <HeaderMain switchNavbarSideView={switchNavbarSideView} />
      <div className="container-main">
        <div className="container-error">
          {info.map((e, i) => {
            setTimeout(() => {
              setInfo([]);
            }, 5000);
            return (
              <div key={i} className="box-error">
                <div>{e}</div>
                <ImCross
                  className="icon-close"
                  onClick={() => {
                    setInfo([]);
                  }}
                />
              </div>
            );
          })}
        </div>
        {navbarSideView ? (
          <div className="container-navBar-left">
            <NavBarSide setNavBarSide={setNavBarSide} />
          </div>
        ) : (
          <></>
        )}
        {<Outlet />}
      </div>
    </>
  );
}

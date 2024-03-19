import { NavLink } from "react-router-dom";
import "./moreoptionsview.css";
import { GoSignOut, GoGear, GoBug, GoUnverified } from "react-icons/go";
import useUser from "../../../hooks/useUser";
import { PiArrowLeftBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/auth/authSlice";
import { useState } from "react";
import ReportProblemView from "./ReportProblemView";

export default function MoreOptionsView({ actionClose }) {
  const dispatch = useDispatch();
  const [moreOptionsView, setOptionsView] = useState(true);
  const [reportProblem_View, setReportProblem_View] = useState(false);
  const { logout } = useUser();

  return (
    <>
      {moreOptionsView ? (
        <div className="container_filter">
          <div className="container_more_options">
            <div
              className="back icon_back_more_options"
              onClick={() => {
                actionClose(false);
              }}
            >
              <PiArrowLeftBold size={24} />
            </div>
            <nav className="more_options_nav">
              <NavLink
                className="item_list_main item_more_option"
                to={"/help/center"}
              >
                <span className="box_icon">
                  <GoUnverified className="icon" size={25} />
                </span>
                <p>Ayuda</p>
              </NavLink>

              <div
                className="item_list_main item_more_option"
                onClick={() => {
                  setOptionsView(false);
                  setReportProblem_View(true);
                }}
              >
                <span className="box_icon">
                  <GoBug className="icon" size={25} />
                </span>
                <p>Reportar problema</p>
              </div>

              <NavLink
                className="item_list_main item_more_option"
                to="/home/profile/config"
                onClick={() => {
                  actionClose(false);
                }}
              >
                <span className="box_icon">
                  <GoGear className="icon" size={25} />
                </span>
                <p>Configuracion</p>
              </NavLink>

              <NavLink
                className="item_list_main item_more_option item_logout_more_options"
                to="/login"
                onClick={() => {
                  window.localStorage.removeItem("sessionId");
                  dispatch(setAuth(false));
                  logout();
                }}
              >
                <span className="">
                  <GoSignOut className="icon" size={25} />
                </span>
                <p>Salir</p>
              </NavLink>
            </nav>
          </div>
        </div>
      ) : (
        <></>
      )}
      {reportProblem_View ? (
        <div className="container_filter">
          <ReportProblemView actionClose={() => actionClose(false)} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

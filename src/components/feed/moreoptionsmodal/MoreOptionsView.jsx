/* eslint-disable react/prop-types */

import "./moreoptionsview.css";
import useUser from "../../../hooks/useUser";
import { PiArrowLeftBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/auth/authSlice";
import { useState } from "react";
import ReportProblemView from "./ReportProblemView";
import { useNavigate } from "react-router-dom";

export default function MoreOptionsView({ closeModal }) {
  const dispatch = useDispatch();
  const [reportProblemModal, setReportProblemModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUser();

  const handlerLogout = () => {
    logout();
    dispatch(setAuth({ session: false }));
  };

  return (
    <div className="container_filter">
      <div className="container_more_options">
        <div className="header-modal">
          <PiArrowLeftBold
            onClick={() => {
              closeModal();
            }}
            size={24}
            className="header-modal__icon-back-modal"
          />
        </div>
        <div className="container-options">
          {/*      <div className="item_more_option">
            <p>Ayuda</p>
          </div> */}

          {/*     <div
            className="item_more_option"
            onClick={() => {
              closeModal();
              setReportProblemModal(true);
            }}
          >
            <p>Reportar problema</p>
          </div> */}

          <div
            className="item_more_option"
            onClick={() => {
              closeModal();
              navigate("/home/profile/config");
            }}
          >
            <p>Configuracion de la cuenta</p>
          </div>

          <div
            className="item_more_option"
            to="/login"
            onClick={() => {
              handlerLogout();
            }}
          >
            <p> Cerrar sesion</p>
          </div>
        </div>
      </div>
    </div>
  );
}

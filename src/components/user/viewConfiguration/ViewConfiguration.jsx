import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import {
  FaRegEyeSlash,
  FaRegBell,
  FaRegBellSlash,
  FaRegEye,
  FaRegHandshake,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import "./viewconfiguration.css";
import { render } from "@testing-library/react";

export default function ViewConfiguration() {
  const {
    setInfo,
    confi_view_private,
    confi_notif,
    confi_requests,
    setConfRequests,
    setConfNotifications,
    setConfPrivate,
  } = useContext(UserContext);

  const [stateButton, setStateButton] = useState("#89caf5");
  const [configs, setConfigs] = useState();
  const { updateInfoUser } = useUser();

  const handlerSendConfig = () => {
    if (configs) {
      updateInfoUser(setInfo, configs, "config");
    }
  };
  return (
    <>
      <div className="container_configs">
        <div className="container_checkbox">
          <div className="container_input_checkbox">
            <FaRegEyeSlash />
            <label className="label_config_input" htmlFor="visibilite_profile">
              Perfil privado
            </label>

            <span
              onClick={() => {
                const aux = configs ?? {};
                setConfPrivate(!confi_view_private);
                aux.view_private = !confi_view_private;
                setConfigs(aux);
                setStateButton("#4298f5");
              }}
            >
              {confi_view_private ? (
                <FaToggleOn size={32} className="input_toggle" />
              ) : (
                <FaToggleOff size={32} className="input_toggle" />
              )}
            </span>
          </div>
          <div className="container_input_checkbox ">
            <FaRegBell />
            <label htmlFor="visibilite_profile " className="label_config_input">
              Notificaciones
            </label>

            <span
              onClick={() => {
                setConfNotifications(!confi_notif);
              }}
            >
              {confi_notif ? (
                <FaToggleOn size={32} className="input_toggle" />
              ) : (
                <FaToggleOff size={32} className="input_toggle" />
              )}
            </span>
          </div>
          <div className="container_input_checkbox ">
            <FaRegHandshake />
            <label htmlFor="visibilite_profile" className="label_config_input">
              No recibir solicitudes
            </label>

            <span
              onClick={() => {
                setConfRequests(!confi_requests);
              }}
            >
              {confi_requests ? (
                <FaToggleOn size={32} className="input_toggle" />
              ) : (
                <FaToggleOff size={32} className="input_toggle" />
              )}
            </span>
          </div>
        </div>

        <div className="container_button">
          {" "}
          <div
            className="button button_save_config"
            style={{ backgroundColor: stateButton }}
            onClick={handlerSendConfig}
          >
            Guardar cambios
          </div>
        </div>

        <div className="delete_account_text">Eliminar cuenta</div>
      </div>
    </>
  );
}

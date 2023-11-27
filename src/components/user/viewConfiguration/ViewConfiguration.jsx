import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { updateUserInfoLocal } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  FaRegEyeSlash,
  FaRegBell,
  FaRegHandshake,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import "./viewconfiguration.css";

export default function ViewConfiguration() {
  const { view_private } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const { setInfo } = useContext(UserContext);

  const [stateButton, setStateButton] = useState("#89caf5");
  const [configs, setConfigs] = useState();

  const [confi_view_private_edit, setConfPrivate] = useState();
  const [confi_notif_edit, setConfNotifications] = useState();
  const [confi_requests_edit, setConfRequests] = useState();

  const { updateUserInfo } = useUser();

  const actionUpdateInfoLocal = () => {
    //actualizo la informacion en redux
    dispatch(updateUserInfoLocal(configs));
  };

  const handlerSendConfig = () => {
    if (configs) {
      updateUserInfo(setInfo, configs, "config", actionUpdateInfoLocal);
    }
  };

  useEffect(() => {
    setConfPrivate(view_private);
  }, []);

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
                setConfPrivate(!confi_view_private_edit);
                aux.view_private = !confi_view_private_edit;
                setConfigs(aux);
                setStateButton("#4298f5");
              }}
            >
              {confi_view_private_edit ? (
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
                setConfNotifications(!confi_notif_edit);
              }}
            >
              {confi_notif_edit ? (
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
                setConfRequests(!confi_requests_edit);
              }}
            >
              {confi_requests_edit ? (
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

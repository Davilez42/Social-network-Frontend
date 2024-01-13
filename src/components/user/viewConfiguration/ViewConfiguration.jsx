import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { updateUserInfoLocal } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaRegEyeSlash,
  FaRegBell,
  FaRegHandshake,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import "./viewconfiguration.css";
import { setAuth } from "../../../features/auth/authSlice";

export default function ViewConfiguration() {
  const { view_private } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const { setInfo } = useContext(UserContext);

  const [stateButton, setStateButton] = useState("#89caf5");
  const [configs, setConfigs] = useState();

  const [confi_view_private_edit, setConfPrivate] = useState();
  const [confi_notif_edit, setConfNotifications] = useState();
  const [confi_requests_edit, setConfRequests] = useState();
  const [box_confirm_delete_account, set_box_confirm_delete_account] =
    useState(false);

  const { updateUserInfo, deleteAccount } = useUser();
  const navigate = useNavigate();

  const actionUpdateInfoLocal = () => {
    //actualizo la informacion en redux
    dispatch(updateUserInfoLocal(configs));
  };

  const handlerSendConfig = () => {
    if (configs) {
      updateUserInfo(setInfo, configs, "config", actionUpdateInfoLocal);
    }
  };

  const handlerDeleteAccount = () => {
    deleteAccount(setInfo, () => {
      dispatch(setAuth({ session: false, csrftoken: " " }));
      navigate("/login");
    });
  };
  console.log("renderiza");
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

        <div
          className="delete_account_text"
          onClick={() => {
            set_box_confirm_delete_account(!box_confirm_delete_account);
          }}
        >
          {(() => {
            if (box_confirm_delete_account) {
              return (
                <div className="container_filter">
                  <div className="box_confirm_deleteaccount ">
                    <div className="text_inf">
                      Estas seguro que deseas eliminar tu cuenta ? tus datos
                      personales y fotos seran eliminados en 30 dias, durante
                      este tiempo tu cuenta permanecera desabilitdad. Si deseas
                      volver a activar tu cuenta debes de volver a iniciar
                      sesion.
                    </div>
                    <div
                      className="button button_confirm_dlt_acc"
                      onClick={handlerDeleteAccount}
                    >
                      continuar
                    </div>
                  </div>
                </div>
              );
            }
          })()}
          Eliminar cuenta
        </div>
      </div>
    </>
  );
}

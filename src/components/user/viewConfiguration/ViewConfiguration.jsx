import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { updatePreferences } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaRegEyeSlash,
  // FaRegBell,
  FaRegHandshake,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import "./viewconfiguration.css";
import { setAuth } from "../../../features/auth/authSlice";
import { decryptDate } from "../../../helpers/encrypt";

export default function ViewConfiguration() {
  const { user_preferences } = decryptDate(
    useSelector((state) => state.user.userInfo)
  );
  console.log(user_preferences);
  const dispatch = useDispatch();
  const { setInfo } = useContext(UserContext);

  const [profilePrivateConfig, setProfilePrivateConfig] = useState(
    user_preferences.profileView
  );
  const [requestConfig, setRequestsConfig] = useState(
    user_preferences.receive_requests
  );

  const [box_confirm_delete_account, set_box_confirm_delete_account] =
    useState(false);

  const { updateUserInfo, deleteAccount } = useUser();
  const navigate = useNavigate();

  const handlerSendConfig = (conf) => {
    updateUserInfo(
      (error) => {
        if (error) {
          return setInfo([error.message]);
        }
        console.log(conf);
        dispatch(updatePreferences(conf));
      },
      conf,
      "preferences"
    );
  };

  const handlerDeleteAccount = () => {
    deleteAccount(setInfo, () => {
      dispatch(setAuth({ session: false, csrftoken: " " }));
      navigate("/login");
    });
  };
  useEffect(() => {}, []);

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
                handlerSendConfig({ profileView: !profilePrivateConfig });
                setProfilePrivateConfig(!profilePrivateConfig);
              }}
            >
              {!profilePrivateConfig ? (
                <FaToggleOn size={32} className="input_toggle" />
              ) : (
                <FaToggleOff size={32} className="input_toggle" />
              )}
            </span>
          </div>
          {/* <div className="container_input_checkbox ">
            <FaRegBell />
            <label htmlFor="visibilite_profile " className="label_config_input">
              Notificaciones
            </label>

            <span onClick={() => {}}>
              {notificationsConfig ? (
                <FaToggleOn size={32} className="input_toggle" />
              ) : (
                <FaToggleOff size={32} className="input_toggle" />
              )}
            </span>
          </div> */}
          <div className="container_input_checkbox ">
            <FaRegHandshake />
            <label htmlFor="visibilite_profile" className="label_config_input">
              No recibir solicitudes
            </label>

            <span
              onClick={() => {
                handlerSendConfig({ receive_requests: !requestConfig });
                setRequestsConfig(!requestConfig);
              }}
            >
              {!requestConfig ? (
                <FaToggleOn size={32} className="input_toggle" />
              ) : (
                <FaToggleOff size={32} className="input_toggle" />
              )}
            </span>
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

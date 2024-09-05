import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { updateUserInfoLocal } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  FaRegEyeSlash,
  FaRegHandshake,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import "./viewconfiguration.css";
import { setAuth } from "../../../features/auth/authSlice";

export default function ViewConfiguration() {
  const { profileView, receiveRequests } = useSelector(
    (state) => state.user.userInfo
  );
  const dispatch = useDispatch();
  const { setInfo } = useContext(UserContext);

  const [profilePrivateConfig, setProfilePrivateConfig] = useState(profileView);
  const [requestConfig, setRequestsConfig] = useState(receiveRequests);

  const [box_confirm_delete_account, set_box_confirm_delete_account] =
    useState(false);

  const { updateUserInfo, deleteAccount } = useUser();

  const handlerSendConfig = (conf) => {
    updateUserInfo((error) => {
      if (error) {
        return setInfo([error.message]);
      }
      dispatch(updateUserInfoLocal(conf));
    }, conf);
  };

  const handlerDeleteAccount = () => {
    deleteAccount((err) => {
      if (err) {
        return setInfo([err.message]);
      }
      dispatch(setAuth({ session: false, token: null }));
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

          <div className="container_input_checkbox ">
            <FaRegHandshake />
            <label htmlFor="visibilite_profile" className="label_config_input">
              No recibir solicitudes
            </label>

            <span
              onClick={() => {
                handlerSendConfig({ receiveRequests: !requestConfig });
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
                  <div className="box_confirm_deleteaccount">
                    <div className="text_inf">
                      Proceso de Eliminación de Cuenta: Estás a punto de
                      eliminar tu cuenta. En 30 días, tus datos personales y
                      fotos serán eliminados. Tu cuenta estará desactivada
                      durante este tiempo. Si cambias de opinión y quieres
                      reactivarla, solo tendrás que iniciar sesión antes de que
                      se complete la eliminación.
                    </div>
                    <div
                      className="button_confirm_delete_account"
                      onClick={handlerDeleteAccount}
                    >
                      Eliminar
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

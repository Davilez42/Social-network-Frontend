import { NavLink } from "react-router-dom";
import "./editformprofile.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { PiArrowLeftBold } from "react-icons/pi";

export default function EditFormProfile() {
  const {
    setInfo,
    setUsername,
    setDate_born,
    setFullname,
    setPhoneNumber,
    setEmail,
    setUserBio,
    username,
    user_bio,
    url_avatar,
    date_born,
    fullname,
    email,
    phone_number,
  } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stateUpdateInfo, setStateUpdateInfo] = useState("gray");
  const [stateUpdatePassword, setStateUpdatePassword] = useState("gray");
  const [objectParams, setParams] = useState({});
  const [avatar, setAvatar] = useState({});
  const usenavigate = useNavigate();

  const { updateInfoUser, updatePassword, updateAvatarUser } =
    useUser(usenavigate);

  const handlerSendData = () => {
    setParams({});
    if (Object.keys(objectParams).length !== 0) {
      updateInfoUser(setInfo, objectParams);
    }
  };

  const handlerSendChangedPassword = () => {
    if (oldPassword.trim() !== "" && newPassword !== "") {
      updatePassword(setInfo, oldPassword, newPassword);
    }
  };

  const handlerUpdateAvatarUser = () => {
    if (avatar instanceof File) {
      updateAvatarUser(setInfo, avatar);
    }
  };
  return (
    <>
      <div className="form-edit-profile">
        <div className="header_edit_form">
          <NavLink className="back" to="/home/profile/view" replace>
            <PiArrowLeftBold size={30} />
          </NavLink>

          <h1>Editar perfil</h1>
        </div>
        <div className="container-avatar">
          <div className="container-image">
            <img
              id="avatar_user"
              className="img-avatar loading"
              loading="lazy"
              src={url_avatar}
              alt=""
            />
          </div>
          <div className="container_inputs_file">
            <label className="label_input_file" htmlFor="input_file">
              Selecciona un foto
            </label>
            <input
              id="input_file"
              type="file"
              className="input-field input-file"
              onChange={(event) => {
                const file = event.target.files[0];
                document.getElementById("avatar_user").src =
                  URL.createObjectURL(file);
                setAvatar(file);
              }}
            />
            <p onClick={handlerUpdateAvatarUser} className=" button_send_file">
              Cambiar imagen
            </p>
          </div>
        </div>

        <div className="forms">
          <div className="container-bio">
            <div className="container-input-width-label">
              <label htmlFor="input_bio">Biografia</label>
              <textarea
                id="input_bio"
                value={user_bio}
                className="input-field"
                placeholder="biografia"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setUserBio(event.target.value);
                  const aux = objectParams;
                  aux.user_bio = event.target.value;
                  setParams(aux);
                }}
              >
                {user_bio}
              </textarea>
            </div>
          </div>

          <div className="container-edit-info">
            <div className="container-input-width-label">
              <label htmlFor="input_names">Nombre</label>
              <input
                id="input_names"
                type="text"
                value={fullname}
                className="input-field"
                placeholder="Nombre completo"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setFullname(event.target.value);
                  const aux = objectParams;
                  aux.fullname = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_phone_number"> Telefono</label>
              <input
                id="input_phone_number"
                type="text"
                value={phone_number}
                className="input-field"
                placeholder="Telefono"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setPhoneNumber(event.target.value);
                  const aux = objectParams;
                  aux.phone_number = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input-birthday"> Fecha nacimiento</label>
              <input
                id="input-birthday"
                value={date_born}
                type="date"
                className="input-field"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setDate_born(event.target.value);
                  const aux = objectParams;
                  aux.date_born = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_username">Nombre de usuario</label>
              <input
                id="input_username"
                type="nickname"
                className="input-field"
                value={username}
                placeholder="Username"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setUsername(event.target.value);
                  const aux = objectParams;
                  aux.username = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_email">Correo Electronico</label>
              <input
                id="input_email"
                type="email"
                className="input-field"
                disabled
                value={email}
                placeholder="Correo electrónico"
              />
            </div>
            <button
              className="button"
              style={{ background: stateUpdateInfo }}
              onClick={handlerSendData}
            >
              Guardar cambios
            </button>
          </div>

          <div className="container-edit-password">
            <hr />
            <p>Contraseña</p>
            <input
              type="password"
              className="input-field"
              placeholder="Nueva contraseña"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
            <input
              type="password"
              className="input-field"
              onChange={(event) => {
                setStateUpdatePassword("#4298f5");
                setOldPassword(event.target.value);
              }}
              placeholder="Contraseña actual"
            />
            <button
              id="button_change_password"
              style={{ background: stateUpdatePassword }}
              className="button"
              onClick={handlerSendChangedPassword}
            >
              Actualizar
            </button>

            <p id="button_delete_account" onClick={() => {}}>
              Eliminar Cuenta
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

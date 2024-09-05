import "./editformprofile.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { PiArrowLeftBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoLocal } from "../../../features/user/userSlice";

export default function EditFormProfile() {
  const { username, bio, avatar, dateBorn, fullname, email, phoneNumber } =
    useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();
  const { setInfo } = useContext(UserContext);
  const [usernameEditView, setUsername_edit] = useState("");
  const [bioEditView, setUser_bio_edit] = useState("");
  const [avatarEditView, setUrl_avatar_edit] = useState("");
  const [fullnameEditView, setFullname_edit] = useState("");
  const [dateBornEditView, setDate_born_edit] = useState("");
  const [phoneNumberEditView, setPhone_number_edit] = useState("");
  const [emailEditView, setEmail_edit] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [objectParams, setParams] = useState({});

  const usenavigate = useNavigate();

  const { updateUserInfo, updatePassword } = useUser();

  const handlerSendData = () => {
    if (Object.keys(objectParams).length !== 0) {
      updateUserInfo((err) => {
        if (err) {
          return setInfo([err.message]);
        }
        setInfo(["Tu perfil ha sido actualizado."]);
        delete objectParams.avatarFile;
        delete objectParams.avatar;
        console.log(objectParams);
        dispatch(updateUserInfoLocal(objectParams));
        setParams({});
      }, objectParams);
    }
  };

  const handlerSendChangedPassword = () => {
    if (oldPassword.trim() !== "" && newPassword !== "") {
      updatePassword(oldPassword, newPassword, (err) => {
        if (err) {
          return setInfo([err.message]);
        }
        setInfo(["Tu contraseña ha sido actualizada."]);
      });
    }
  };

  useEffect(() => {
    setUsername_edit(username);
    setUser_bio_edit(bio);
    setFullname_edit(fullname);
    setEmail_edit(email);
    setUrl_avatar_edit(avatar.url);
    setDate_born_edit(dateBorn?.split("T")[0]);
    setUsername_edit(username);
    setPhone_number_edit(phoneNumber);
  }, [username, bio, avatar.url, dateBorn, fullname, email, phoneNumber]);

  return (
    <>
      <div className="form-edit-profile">
        <div className="header-edit-form">
          <PiArrowLeftBold
            className="header-modal__icon-back-modal"
            onClick={() => {
              usenavigate(`/home/profile/view`);
            }}
            size={24}
          />

          <div className="header-modal__box-tittle ">
            <p>Editar perfil</p>
          </div>
        </div>

        <div className="forms">
          <div className="container-avatar">
            <div className="container-image">
              <img
                id="avatar_user"
                className="img-avatar loading"
                loading="lazy"
                src={avatarEditView}
                alt=""
              />
            </div>
            <div className="container_inputs_file">
              <label className="button-edit-profile" htmlFor="input_file">
                Subir
              </label>
              <div
                onClick={() => {
                  setParams({ avatar: "delete" });
                  handlerSendData();
                }}
                className=" delete-avatar"
              >
                Eliminar
              </div>
              <input
                id="input_file"
                type="file"
                className="input-field input-file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  const aux = objectParams;
                  aux.avatarFile = file;
                  setParams(aux);
                  const url = URL.createObjectURL(file);
                  document.getElementById("avatar_user").src =
                    URL.createObjectURL(file);
                  setUrl_avatar_edit(url);
                }}
              />
            </div>
          </div>

          <div className="container-bio">
            <div className="container-input-width-label">
              <label htmlFor="input_bio">Biografia</label>
              <textarea
                id="input_bio"
                value={bioEditView}
                className="input-field"
                placeholder="biografia"
                onChange={(event) => {
                  setUser_bio_edit(event.target.value);
                  const aux = objectParams;
                  aux.bio = event.target.value;
                  setParams(aux);
                }}
              >
                {bioEditView}
              </textarea>
            </div>
          </div>

          <div className="container-edit-info">
            <div className="container-input-width-label">
              <label htmlFor="input_names">Nombre</label>
              <input
                id="input_names"
                type="text"
                value={fullnameEditView}
                className="input-field"
                placeholder="Nombre completo"
                onChange={(event) => {
                  setFullname_edit(event.target.value);
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
                value={phoneNumberEditView}
                className="input-field"
                placeholder="Telefono"
                onChange={(event) => {
                  setPhone_number_edit(event.target.value);
                  const aux = objectParams;
                  aux.phoneNumber = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input-birthday"> Fecha nacimiento</label>
              <input
                id="input-birthday"
                value={dateBornEditView}
                type="date"
                className="input-field"
                onChange={(event) => {
                  setDate_born_edit(event.target.value);
                  const aux = objectParams;
                  aux.dateBorn = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_username">Nombre de usuario</label>
              <input
                disabled
                id="input_username"
                type="nickname"
                className="input-field"
                value={usernameEditView}
                placeholder="Username"
                onChange={(event) => {
                  setUsername_edit(event.target.value);
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
                value={emailEditView}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="button-edit-profile" onClick={handlerSendData}>
              Actualizar perfil
            </div>
          </div>

          <div className="container-edit-password">
            <hr />
            <p>Contraseña</p>
            <input
              type="password"
              className="input-field"
              onChange={(event) => {
                setOldPassword(event.target.value);
              }}
              placeholder="Contraseña actual"
            />
            <input
              type="password"
              className="input-field"
              placeholder="Nueva contraseña"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />

            <div
              id="button_change_password"
              className="button-edit-profile"
              onClick={handlerSendChangedPassword}
            >
              Cambiar contraseña
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

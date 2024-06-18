import "./editformprofile.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { PiArrowLeftBold } from "react-icons/pi";
import { decryptDate } from "../../../helpers/encrypt";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoLocal } from "../../../features/user/userSlice";

export default function EditFormProfile() {
  const { username, bio, avatar, dateBorn, fullname, email, phoneNumber } =
    decryptDate(useSelector((state) => state.user.userInfo));
  const dispatch = useDispatch();
  const [username_edit, setUsername_edit] = useState("");
  const [user_bio_edit, setUser_bio_edit] = useState("");
  const [url_avatar_edit, setUrl_avatar_edit] = useState("");
  const [fullname_edit, setFullname_edit] = useState("");
  const [date_born_edit, setDate_born_edit] = useState("");
  const [phone_number_edit, setPhone_number_edit] = useState("");
  const [email_edit, setEmail_edit] = useState("");

  const { setInfo } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [stateUpdateInfo, setStateUpdateInfo] = useState("gray");
  const [stateUpdatePassword, setStateUpdatePassword] = useState("gray");

  const [objectParams, setParams] = useState({});
  const [avatar_, setAvatar] = useState({});
  const usenavigate = useNavigate();

  const { updateUserInfo, updatePassword, updateAvatarUser } = useUser();

  const handlerSendData = () => {
    if (Object.keys(objectParams).length !== 0) {
      updateUserInfo((err) => {
        if (err) {
          return setInfo([err.message]);
        }
        setInfo(["Se actualizado tu informacion"]);
        dispatch(updateUserInfoLocal(objectParams));
      }, objectParams);
    }
  };

  const handlerSendChangedPassword = () => {
    if (oldPassword.trim() !== "" && newPassword !== "") {
      updatePassword(oldPassword, newPassword, (err) => {
        if (err) {
          return setInfo([err.message]);
        }
        setInfo(["Tu contraseña ha sido actualizada"]);
      });
    }
  };

  const handlerUpdateAvatarUser = () => {
    if (avatar_ instanceof File) {
      updateAvatarUser(avatar_, (err) => {
        if (err) {
          return setInfo([err.message]);
        }
        avatar.url = url_avatar_edit;
        dispatch(updateUserInfoLocal({ avatar }));
        setInfo(["Avatar cambiado"]);
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
        <div className="container-avatar">
          <div className="container-image">
            <img
              id="avatar_user"
              className="img-avatar loading"
              loading="lazy"
              src={url_avatar_edit}
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
                const url = URL.createObjectURL(file);
                document.getElementById("avatar_user").src =
                  URL.createObjectURL(file);
                setUrl_avatar_edit(url);

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
                value={user_bio_edit}
                className="input-field"
                placeholder="biografia"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setUser_bio_edit(event.target.value);
                  const aux = objectParams;
                  aux.bio = event.target.value;
                  setParams(aux);
                }}
              >
                {user_bio_edit}
              </textarea>
            </div>
          </div>

          <div className="container-edit-info">
            <div className="container-input-width-label">
              <label htmlFor="input_names">Nombre</label>
              <input
                id="input_names"
                type="text"
                value={fullname_edit}
                className="input-field"
                placeholder="Nombre completo"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
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
                value={phone_number_edit}
                className="input-field"
                placeholder="Telefono"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setPhone_number_edit(event.target.value);
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
                value={date_born_edit}
                type="date"
                className="input-field"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
                  setDate_born_edit(event.target.value);
                  const aux = objectParams;
                  aux.date_born = event.target.value;
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
                value={username_edit}
                placeholder="Username"
                onChange={(event) => {
                  setStateUpdateInfo("#4298f5");
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
                value={email_edit}
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
          </div>
        </div>
      </div>
    </>
  );
}

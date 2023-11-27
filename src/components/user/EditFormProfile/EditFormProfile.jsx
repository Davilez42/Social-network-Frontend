import { NavLink } from "react-router-dom";
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
  const {
    username,
    user_bio,
    url_avatar,
    date_born,
    fullname,
    email,
    phone_number,
  } = decryptDate(useSelector((state) => state.user.userInfo));
  const dispatch = useDispatch();
  //estados del propio componente
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
  const [avatar, setAvatar] = useState({});
  const usenavigate = useNavigate();

  const { updateUserInfo, updatePassword, updateAvatarUser } =
    useUser(usenavigate);

  const handlerSendData = () => {
    setParams({});
    console.log(date_born_edit);
    if (Object.keys(objectParams).length !== 0) {
      updateUserInfo(setInfo, objectParams, undefined, () => {
        dispatch(updateUserInfoLocal(objectParams));
      });
    }
  };

  const handlerSendChangedPassword = () => {
    if (oldPassword.trim() !== "" && newPassword !== "") {
      updatePassword(setInfo, oldPassword, newPassword);
    }
  };

  const handlerUpdateAvatarUser = () => {
    if (avatar instanceof File) {
      updateAvatarUser(
        setInfo,
        avatar,
        () => {},
        () => {
          dispatch(updateUserInfoLocal({ url_avatar: url_avatar_edit }));
        }
      );
    }
  };

  useEffect(() => {
    setUsername_edit(username);
    setUser_bio_edit(user_bio);
    setFullname_edit(fullname);
    setEmail_edit(email);
    setUrl_avatar_edit(url_avatar);
    setDate_born_edit(date_born.split("T")[0]);
    setUsername_edit(username);
    setPhone_number_edit(phone_number);
  }, [
    username,
    user_bio,
    url_avatar,
    date_born,
    fullname,
    email,
    phone_number,
  ]);

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
                  aux.user_bio = event.target.value;
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

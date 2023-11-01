import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./editformprofile.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/userContextRegister";
import useUser from "../../../hooks/useUser";

export default function EditFormProfile() {
  const { id_user } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [date_born, setDate_born] = useState("");
  const [url_avatar, setUrlavatar] = useState("");
  const { setErrors } = useContext(UserContext);
  const { getInfoUser } = useUser();
  useEffect(() => {
    getInfoUser(
      setErrors,
      id_user,
      setUsername,
      setDate_born,
      setFullname,
      setPhoneNumber,
      setUrlavatar,
      setEmail
    );
  }, []);

  return (
    <>
      <div className="form-edit-profile">
        <h1>Editar perfil</h1>
        <div className="container-avatar">
          <img className="img-avatar" src={url_avatar} alt="" />

          <input
            id="input_file"
            type="file"
            className="input-field"
            placeholder="Nombre completo"
          />
          <button className="button">Cambiar foto</button>
        </div>
        <div className="forms">
          <div className="container-edit-info">
            <input
              id="input_names"
              type="text"
              value={fullname}
              className="input-field"
              placeholder="Nombre completo"
            />

            <input
              type="text"
              value={phone_number}
              className="input-field"
              placeholder="Telefono"
            />
            <div className="container-input-date">
              <label htmlFor="input-birthday"> Fecha nacimiento</label>
              <input
                id="input-birthday"
                value={date_born}
                type="date"
                className="input-field"
              />
            </div>
            <input
              type="nickname"
              className="input-field"
              value={username}
              placeholder="Username"
            />
            <input
              type="email"
              className="input-field"
              value={email}
              placeholder="Correo electrónico"
            />
            <button className="button">Guardar</button>
          </div>
          <div className="container-edit-password">
            <p>Cambiar Contraseña</p>
            <input
              type="password"
              className="input-field"
              placeholder="Nueva contraseña"
            />
            <input
              type="password"
              className="input-field"
              placeholder="Contraseña actual"
            />

            <button className="button">Cambiar</button>
          </div>
        </div>
      </div>
    </>
  );
}

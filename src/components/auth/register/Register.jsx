/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useUser from "../../../hooks/useUser";

export default function Register() {
  const [message, setMessage] = useState("");
  const [nombreUsuario, setUsername] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [fullname, setFullname] = useState("");
  const usenavigate = useNavigate();
  const { registerUser } = useUser(usenavigate);
  const [loader, setLoader] = useState(false);
  // const [telefono, SetTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const handleRegistro = () => {
    setMessage("");
    if (
      contrasena.trim() !== "" &&
      fullname.trim() !== "" &&
      nombreUsuario.trim() !== "" &&
      fechaNacimiento.trim() !== "" &&
      correoElectronico.trim() !== ""
    ) {
      setLoader(true);

      registerUser(
        (err, data) => {
          setLoader(false);
          if (err) {
            if (err.code === 105) {
              return setMessage(err.message);
            }
            if (err.type === "INCORRECT_EMAIL_FORMAT") {
              return setMessage("El correo electronico no es valido");
            }
            if (err.type === "INCORRECT_PASSWORD_FORMAT") {
              return setMessage("la contraseña no es valida");
            }
            return setMessage(err.message);
          }
          usenavigate(`/confirmEmail/${data.data.userId}/${nombreUsuario}`);
        },
        nombreUsuario,
        contrasena,
        fullname,
        fechaNacimiento,
        correoElectronico
      );
    }
  };
  useEffect(() => {
    if (
      contrasena &&
      correoElectronico &&
      nombreUsuario &&
      fullname &&
      fechaNacimiento &&
      contrasena
    ) {
      document.getElementById("button_register").style =
        "background-color:#d4d4d4;";
    } else {
      document.getElementById("button_register").style =
        "background-color:##ededed;";
    }
  });

  return (
    <>
      <div className="container-text">
        <p className="title-form-type">Registro</p>
      </div>

      <div className="container-text">
        <p className="text-frase">¡La diversión comienza aquí!</p>
      </div>

      <input
        id="input_names"
        required
        type="text"
        className="input-field"
        placeholder="Nombre completo *"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />

      {/*       <input
        required
        type="text"
        className="input-field"
        placeholder="Telefono *"
        value={telefono}
        onChange={(e) => SetTelefono(e.target.value)}
      /> */}
      <div className="container-input-width-label">
        <label htmlFor="input-birthday"> Fecha nacimiento</label>
        <input
          required
          id="input-birthday"
          type="date"
          className="input-field"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>
      <input
        required
        type="nickname"
        className="input-field"
        placeholder="Username *"
        value={nombreUsuario}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        required
        type="email"
        className="input-field"
        placeholder="Correo electrónico *"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />
      <input
        required
        type="password"
        className="input-field"
        placeholder="Contraseña  minimo 6 caracteres *"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      <div className="info-text">{message}</div>

      <div id="button_register" className="button" onClick={handleRegistro}>
        {loader ? <div className="loader-auth"></div> : "Registrarme"}
      </div>

      <div className="box-info">
        ya tienes una cuenta ?{" "}
        <NavLink className="here" to="/login">
          inicia aqui
        </NavLink>{" "}
      </div>
    </>
  );
}

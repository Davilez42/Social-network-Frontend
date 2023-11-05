import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [message, setMessage] = useState("");
  const { userLogin, userLoginWithGoogle } = useUser();

  const handlerLogin = () => {
    if (correoElectronico.trim() !== "" && contrasena.trim() !== "") {
      console.log("ENVIA DATOS");
      userLogin(setMessage, correoElectronico, contrasena);
    }
  };

  const handlerSignWithGoogleSuccess = (credentials) => {
    userLoginWithGoogle(setMessage, credentials);
  };
  const handlerSignWithGoogleError = (error) => {
    setMessage("Error al iniciar con google");
  };

  useEffect(() => {
    if (contrasena && correoElectronico) {
      document.getElementById("button_login").style =
        "background-color:#1399f3;";
    } else {
      document.getElementById("button_login").style =
        "background-color:#76c2f5;";
    }
  });

  return (
    <>
      <div className="container-text">
        <p className="title-form-type">Login</p>
      </div>

      <input
        type="email"
        id="input_email"
        required
        className="input-field"
        placeholder="Correo electrónico"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />

      <input
        id="input_password"
        type="password"
        required
        className="input-field"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <div className="info-text">{message}</div>
      <GoogleLogin
        text="signin_with"
        width="250"
        onSuccess={handlerSignWithGoogleSuccess}
        onError={handlerSignWithGoogleError}
        useOneTap
      />
      <div className="box-info">
        Olvidaste tu contraseña ?{" "}
        <NavLink className="here" to="/passwordRestore">
          recuperar
        </NavLink>{" "}
      </div>

      <button id="button_login" className="button" onClick={handlerLogin}>
        Inicia sesion
      </button>

      <div className="box-info">
        no tienes una cuenta ?{" "}
        <NavLink className="here" to="/register">
          registrate aqui
        </NavLink>{" "}
      </div>
    </>
  );
}

export default Login;

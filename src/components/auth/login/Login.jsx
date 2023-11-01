import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = () => {
    const data = {
      correoElectronico,
      contrasena,
    };
  };

  return (
    <>
      <div className="container-text">
        <p className="title-form-type">Login</p>
      </div>

      <input
        type="email"
        className="input-field"
        placeholder="Correo electrónico"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <button className="button" onClick={handleRegistro}>
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

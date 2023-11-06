import React, { useState, useEffect } from "react";
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
  const [telefono, SetTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const handleRegistro = () => {
    if (
      contrasena.trim() !== "" &&
      fullname.trim() !== "" &&
      telefono.trim() !== "" &&
      nombreUsuario.trim() !== "" &&
      fechaNacimiento.trim() !== "" &&
      correoElectronico.trim() !== ""
    ) {
      console.log("ENVIA DATOS");
      registerUser(
        setMessage,
        nombreUsuario,
        contrasena,
        fullname,
        fechaNacimiento,
        correoElectronico,
        telefono
      );
    }
  };
  useEffect(() => {
    if (
      contrasena &&
      correoElectronico &&
      telefono &&
      nombreUsuario &&
      fullname &&
      fechaNacimiento &&
      contrasena
    ) {
      document.getElementById("button_register").style =
        "background-color:#1399f3;";
    } else {
      document.getElementById("button_register").style =
        "background-color:#76c2f5;";
    }
  });

  return (
    <>
      <div className="container-text">
        <p className="text-frase">
          ¡La diversión comienza aquí! Únete y sé parte de algo
          extraordinario.🎉"
        </p>
      </div>

      <div className="container-text">
        <p className="title-form-type">Register</p>
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

      <input
        required
        type="text"
        className="input-field"
        placeholder="Telefono *"
        value={telefono}
        onChange={(e) => SetTelefono(e.target.value)}
      />
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
        placeholder="Contraseña *"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      <div className="info-text">{message}</div>

      <button id="button_register" className="button" onClick={handleRegistro}>
        Registrarme
      </button>

      <div className="box-info">
        ya tienes una cuenta ?{" "}
        <NavLink className="here" to="/login">
          inicia aqui
        </NavLink>{" "}
      </div>
    </>
  );
}

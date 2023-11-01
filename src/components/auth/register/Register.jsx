import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { UserContext } from "../../../context/userContextRegister";
function Register({ handlerErrors }) {
  const { errors, setErrors } = useContext(UserContext);
  const [nombreUsuario, setUsername] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [fullname, setFullname] = useState("");
  const { registerUser } = useUser();

  const [telefono, SetTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const handleRegistro = () => {
    if (fullname.trim() === "") {
      console.log("entra");
      setErrors(["Profavor ingrese un nombre"]);
      return;
    }
    if (telefono.trim() === "") {
      console.log("entra");
      setErrors(["Profavor ingrese un numero de celular"]);
      return;
    }
    if (nombreUsuario.trim() === "") {
      console.log("entra");
      setErrors(["Debes ingrese un nombre de usuario"]);
      return;
    }
    if (fechaNacimiento.trim() === "") {
      console.log("entra");
      setErrors(["Profavor ingrese una fecha de nacimiento"]);
      return;
    }
    if (correoElectronico.trim() === "") {
      console.log("entra");
      setErrors(["Profavor ingrese una fecha de nacimiento"]);
      return;
    }
    if (contrasena.trim() === "") {
      console.log("entra");
      setErrors(["Profavor ingrese una contraseña"]);
      return;
    }
    registerUser(
      setErrors,
      nombreUsuario,
      contrasena,
      fullname,
      fechaNacimiento,
      correoElectronico,
      telefono
    );
  };

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
        type="text"
        className="input-field"
        placeholder="Nombre completo *"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />

      <input
        type="text"
        className="input-field"
        placeholder="Telefono *"
        value={telefono}
        onChange={(e) => SetTelefono(e.target.value)}
      />
      <div className="container-input-date">
        <label htmlFor="input-birthday"> Fecha nacimiento</label>
        <input
          id="input-birthday"
          type="date"
          className="input-field"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>
      <input
        type="nickname"
        className="input-field"
        placeholder="Username *"
        value={nombreUsuario}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        className="input-field"
        placeholder="Correo electrónico *"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="Contraseña *"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <button className="button" onClick={handleRegistro}>
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

export default Register;

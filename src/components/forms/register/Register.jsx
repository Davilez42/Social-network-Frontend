import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const [nombreUsuario, setUsername] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombrePrincipal, setNombrePrincipal] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Telefono, SetTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = () => {
    const data = {
      nombreUsuario,
      correoElectronico,
      contrasena,
      nombrePrincipal,
      Apellido,
      Telefono,
      fechaNacimiento,
      Direccion,
    };
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
        value={nombrePrincipal}
        onChange={(e) => setNombrePrincipal(e.target.value)}
      />

      <input
        type="text"
        className="input-field"
        placeholder="Telefono *"
        value={Telefono}
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

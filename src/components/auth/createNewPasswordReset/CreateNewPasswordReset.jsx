import React, { useState } from "react";
import { NavLink } from "react-router-dom";
function CreateNewPasswordReset() {
  const [correoElectronico, setCorreoElectronico] = useState("");

  const handlePassword = () => {
    const data = {
      correoElectronico,
    };
  };

  return (
    <>
      <div className="container-text">
        <p className="text-frase">
          Hola ! ahora ya puedes cambiar tu contraseña
        </p>
      </div>
      <div className="container-text">
        <p className="title-form-type">Crear contraseña</p>
      </div>
      <input
        type="password"
        className="input-field"
        placeholder="Nueva contraseña"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="Confirmar contraseña"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />

      <button className="button" onClick={handlePassword}>
        Cambiar
      </button>
      <div className="box-info">
        volver a{" "}
        <NavLink className="here" to="/login">
          inicio
        </NavLink>{" "}
      </div>
    </>
  );
}

export default CreateNewPasswordReset;

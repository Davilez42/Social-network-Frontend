import React, { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
function CreateNewPasswordReset() {
  const { accesToken } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { restorePassword } = useUser(navigate);

  const handlePassword = () => {
    if (
      newPassword.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      confirmPassword === newPassword
    ) {
      restorePassword(setMessage, accesToken, newPassword);
    } else {
      setMessage("Las contraseña no son iguales");
    }
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
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="info-text">{message}</div>
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

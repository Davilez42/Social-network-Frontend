import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
function RestorePassword() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [seconds, setSeconds] = useState(30);
  let cont = 30;

  const setjsnterval = () => {
    const btn = document.getElementById("button-send-email");
    btn.style = "background:gray;";
    const id = setInterval(() => {
      if (cont > 0) {
        cont -= 1;
        setSeconds((seconds) => seconds - 1);
      } else {
        cont = 30;
        btn.style = "background:#1399f3;";
        setSeconds((seconds) => 30);
        console.log("termino");
        clearInterval(id);
      }
    }, 1000);
  };

  const handlePassword = () => {
    if (seconds === 30) {
      setjsnterval();
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="container-text">
        <p className="text-frase">
          ¡Porfavor ingresa tu correo electronico para enviarte el link de
          recuperacion! 🔒 "
        </p>
      </div>
      <div className="container-text">
        <p className="title-form-type">Recuperar</p>
      </div>
      <input
        type="email"
        className="input-field"
        placeholder="Correo electrónico *"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
      />
      <div className="box-info">
        no te ha llegado un correo ? lo puedes reenviar en: <b>{seconds}</b>
      </div>
      <button
        id="button-send-email"
        className="button"
        onClick={handlePassword}
      >
        Enviar
      </button>

      <div className="box-info">
        volver a{" "}
        <NavLink className="here" to="/login">
          Inicio
        </NavLink>
      </div>
    </>
  );
}

export default RestorePassword;

import { useParams } from "react-router-dom";
import "./confirmverifiedcode.css";
import { useState, useEffect } from "react";

import useUser from "../../../hooks/useUser";
import { NavLink } from "react-router-dom";

export default function ConfirmVerifiedCode() {
  const { id_user, name } = useParams();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const { confirmVerifyCode, sendEmailVerified } = useUser();
  const handlerConfirmCode = () => {
    if (!code) {
      setMessage("Porfavor ingresa un codio");
      return;
    }
    confirmVerifyCode(setMessage, id_user, code);
    setCode("");
  };

  const handlerSendEmail = () => {
    sendEmailVerified(setMessage, id_user);
  };

  useEffect(() => {
    if (code) {
      document.getElementById("input_confirm_code").style =
        "background-color:#1399f3;";
    } else {
      document.getElementById("input_confirm_code").style =
        "background-color:#76c2f5;";
    }
  });
  return (
    <>
      <div className="container-text">
        <p className="text-frase">
          Hola! 🖐️ <b>{name}</b> Hemos enviado un codigo de verificacion a tu
          correo, ingresa el codigo para poder <b>verificar tu cuenta</b>
        </p>
      </div>
      <div className="inputs_code">
        <input
          type="text"
          className="input-field input_digit"
          onChange={(event) => {
            setCode(code + event.target.value);
            //event.target.setAttribute("disabled", "");
            document.getElementById("input_2").focus();
          }}
        />
        <input
          id="input_2"
          type="text"
          className="input-field input_digit"
          onChange={(event) => {
            setCode(code + event.target.value);
            //event.target.setAttribute("disabled", "");
            document.getElementById("input_3").focus();
          }}
        />
        <input
          type="text"
          id="input_3"
          className="input-field input_digit"
          onChange={(event) => {
            setCode(code + event.target.value);
            //event.target.setAttribute("disabled", "");
            document.getElementById("input_4").focus();
          }}
        />
        <input
          type="text"
          id="input_4"
          className="input-field input_digit"
          onChange={(event) => {
            setCode(code + event.target.value);
            //event.target.setAttribute("disabled", "");
          }}
        />
      </div>
      <div className="box-info">
        no te ha llegado un codigo de verificacion ?{" "}
        <NavLink className="here" onClick={handlerSendEmail}>
          enviar codigo
        </NavLink>
      </div>
      <div className="info-text">{message}</div>
      <button
        id="input_confirm_code"
        className="button"
        onClick={handlerConfirmCode}
      >
        Confirmar
      </button>
      <div className="box-info">
        volver a{" "}
        <NavLink className="here" to="/login">
          inicio
        </NavLink>
      </div>
    </>
  );
}

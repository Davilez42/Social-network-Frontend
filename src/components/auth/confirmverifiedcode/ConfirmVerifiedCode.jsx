import { useParams } from "react-router-dom";
import "./confirmverifiedcode.css";
import { useState, useEffect } from "react";

import useUser from "../../../hooks/useUser";
import { NavLink, useNavigate } from "react-router-dom";

export default function ConfirmVerifiedCode() {
  const { id_user, name } = useParams();
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [message, setMessage] = useState("");
  const usenavigate = useNavigate();
  const { confirmVerifyCode, sendEmail } = useUser(usenavigate);

  const clearInputs = () => {
    setCode1("");
    setCode2("");
    setCode3("");
    setCode4("");
  };

  const handlerConfirmCode = () => {
    if ((code1 + code2 + code3 + code4).length !== 4) {
      setMessage("Porfavor ingresa un codio correcto");
      return;
    }
    confirmVerifyCode(
      setMessage,
      id_user,
      code1 + code2 + code3 + code4,
      clearInputs
    );
  };

  const handlerSendEmail = () => {
    sendEmail(setMessage, parseInt(id_user), undefined, "verifyAccount");
  };

  useEffect(() => {
    if ((code1 + code2 + code3 + code4).length === 4) {
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
          id="input_1"
          value={code1}
          className="input-field input_digit"
          onChange={(event) => {
            setCode1(event.target.value);
            document.getElementById("input_2").focus();
          }}
        />
        <input
          id="input_2"
          type="text"
          value={code2}
          className="input-field input_digit"
          onChange={(event) => {
            setCode2(event.target.value);
            document.getElementById("input_3").focus();
          }}
        />
        <input
          type="text"
          id="input_3"
          value={code3}
          className="input-field input_digit"
          onChange={(event) => {
            setCode3(event.target.value);
            document.getElementById("input_4").focus();
          }}
        />
        <input
          type="text"
          id="input_4"
          value={code4}
          className="input-field input_digit"
          onChange={(event) => {
            setCode4(event.target.value);
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

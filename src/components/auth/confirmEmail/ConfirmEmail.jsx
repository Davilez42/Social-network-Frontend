import { useParams } from "react-router-dom";
import "./confirmemail.css";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContextRegister";
import useUser from "../../../hooks/useUser";
export default function ConfirmEmail() {
  const { id_user, name } = useParams();
  const [code, setCode] = useState("");
  const { errors, setErrors } = useContext(UserContext);
  const { confirmVerifyCode } = useUser();
  const handler = () => {
    if (!code) {
      setErrors(["Porfavor ingresa un codio"]);
      return;
    }
    confirmVerifyCode(setErrors, id_user, code);
  };
  return (
    <>
      <div className="container-text">
        <p className="text-frase">
          Hola! 🖐️ <b>{name}</b> Hemos enviado un codigo de verificacion a tu
          correo, ingresa el codigo para poder <b>verificar tu cuenta</b>
        </p>
      </div>
      <input
        type="text"
        className="input-field"
        placeholder="Codigo de verificacion"
        onChange={(event) => {
          setCode(event.target.value);
        }}
      />
      <button className="button" onClick={handler}>
        Confirmar
      </button>
    </>
  );
}

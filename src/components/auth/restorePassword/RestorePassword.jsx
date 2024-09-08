import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../../hooks/useUser";
function RestorePassword() {
  const [email, setEmail] = useState("");
  const { sendEmail } = useUser();
  const [message, setMessage] = useState("");
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
        setSeconds(30);
        clearInterval(id);
      }
    }, 1000);
  };

  const handlePassword = () => {
    if (email.trim() !== "") {
      if (seconds === 30) {
        sendEmail(
          (err) => {
            if (err) {
              setMessage(err.message);
            }
          },
          email,
          "passReset"
        );
        setjsnterval();
      }
    } else {
      setMessage("Por favor ingrese un correo electronico");
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="container-text">
        <p className="title-form-type">Recuperar</p>
      </div>
      <div className="container-text">
        <p className="text-frase">
          Ingresa tu correo electrónico para que te enviemos el enlace de
          recuperación. 🔒
        </p>
      </div>

      <input
        type="email"
        className="input-field"
        placeholder="Correo electrónico *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="box-info">
        no te ha llegado un correo ? lo puedes reenviar en: <b>{seconds}</b>
      </div>
      <div className="info-text">{message}</div>
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

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/auth/authSlice";
function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [message, setMessage] = useState("");
  const usenavigate = useNavigate();
  const { userLogin, userLoginWithGoogle } = useUser(usenavigate);
  const dispatch = useDispatch();

  const handlerLogin = () => {
    if (email.trim() !== "" && contrasena.trim() !== "") {
      userLogin(email, contrasena, (error, data) => {
        if (error) {
          if (error.code === 103) {
            return setMessage(`El usuario no existe`);
          }
          if (error.code === 101) {
            return setMessage(`Contraseña incorrecta`);
          }
        }
        if (data?.state === "PENDING_TO_VERIFIED") {
          return usenavigate(
            `/confirmEmail/${data.data.id_user}/${
              data.data.fullname.split(" ")[0]
            }`
          );
        }

        dispatch(
          setAuth({
            session: true,
            csrftoken: data.data.csrftoken,
            id_user: data.data.id_user,
          })
        );
        window.localStorage.setItem("id_user", data.data.id_user);
        usenavigate(`/home/feed`);
      });
    }
  };

  const handlerSignWithGoogleSuccess = (credentials) => {
    userLoginWithGoogle((err, data) => {
      if (err) {
        return setMessage(err.message);
      }
      dispatch(
        setAuth({
          session: true,
          csrftoken: data.data.csrftoken,
          id_user: data.data.id_user,
        })
      );
      window.localStorage.setItem("id_user", data.data.id_user);
      usenavigate(`/home/feed`);
    }, credentials);
  };
  const handlerSignWithGoogleError = (error) => {
    console.error(error);
    setMessage("Error al iniciar con google");
  };

  useEffect(() => {
    if (contrasena && email) {
      document.getElementById("button_login").style =
        "background-color:#1399f3;";
    } else {
      document.getElementById("button_login").style =
        "background-color:#76c2f5;";
    }
  });

  return (
    <>
      <div className="container-text">
        <p className="title-form-type">Login</p>
      </div>

      <input
        type="email"
        id="input_email"
        required
        className="input-field"
        placeholder="Correo electrónico o usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlerLogin();
          }
        }}
      />

      <input
        id="input_password"
        type="password"
        required
        className="input-field"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlerLogin();
          }
        }}
      />
      <div className="info-text">{message}</div>
      <GoogleLogin
        text="signin_with"
        width="250"
        onSuccess={handlerSignWithGoogleSuccess}
        onError={handlerSignWithGoogleError}
        useOneTap
      />
      <div className="box-info">
        Olvidaste tu contraseña ?{" "}
        <NavLink className="here" to="/passwordRestore">
          recuperar
        </NavLink>{" "}
      </div>

      <button id="button_login" className="button" onClick={handlerLogin}>
        Inicia sesion
      </button>

      <div className="box-info">
        no tienes una cuenta ?{" "}
        <NavLink className="here" to="/register">
          registrate aqui
        </NavLink>{" "}
      </div>
    </>
  );
}

export default Login;

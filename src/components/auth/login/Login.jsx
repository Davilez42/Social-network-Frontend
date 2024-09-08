import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/auth/authSlice";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const { userLogin, userLoginWithGoogle } = useUser();
  const usenavigate = useNavigate();
  const dispatch = useDispatch();

  const handlerLogin = () => {
    setMessage("");

    if (user.trim() !== "" && password.trim() !== "") {
      setLoader(true);
      userLogin(user, password, (error, data) => {
        setLoader(false);
        if (error) {
          if (error.code === 103) {
            return setMessage(`El usuario no existe`);
          }
          if (error.code === 101) {
            return setMessage(`Contraseña incorrecta`);
          }
        }
        if (!data) {
          return setMessage(
            `Ups estamos teniendo problemas en estos momentos, 😕 Porfavor intenta en unos minutos`
          );
        }

        if (data.data.pendingToVerified) {
          return usenavigate(
            `/confirmEmail/${data.data.userId}/${
              data.data.username.split(" ")[0]
            }`
          );
        }

        dispatch(
          setAuth({
            session: true,
            token: data.data.token,
            userId: data.data.userId,
          })
        );
        usenavigate(`/home/feed`);
      });
    }
  };

  const handlerSignWithGoogleSuccess = ({ credential, clientId }) => {
    //console.log(credentials);
    userLoginWithGoogle(
      (err, data) => {
        if (err) {
          return setMessage(err.message);
        }
        dispatch(
          setAuth({
            session: true,
            token: data.data.token,
            userId: data.data.userId,
          })
        );
        usenavigate(`/home/feed`);
      },
      { credential, clientId }
    );
  };

  const handlerSignWithGoogleError = () => {
    setMessage("Error al iniciar con google");
  };

  useEffect(() => {
    if (password && user) {
      document.getElementById("button_login").style =
        "background-color:#d4d4d4;";
    } else {
      document.getElementById("button_login").style =
        "background-color:##ededed;;";
    }
  }, [password]);

  return (
    <>
      <div className="container-text">
        <p className="title-form-type">Inicia sesion</p>
      </div>

      <input
        type="email"
        id="input_email"
        required
        className="input-field"
        placeholder="Usuario o correo electronico"
        value={user}
        onChange={(e) => setUser(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlerLogin();
          }
        }}
      />
      <div className="info-text">{message}</div>
      <div className="box-info">
        Olvidaste tu contraseña ?{" "}
        <NavLink className="here" to="/passwordRestore">
          recuperar
        </NavLink>{" "}
      </div>
      <GoogleLogin
        text="signin_with"
        width="250"
        onSuccess={handlerSignWithGoogleSuccess}
        onError={handlerSignWithGoogleError}
        useOneTap
      />

      <div id="button_login" className="button" onClick={handlerLogin}>
        {loader ? <div className="loader-auth"></div> : "Iniciar"}
      </div>

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

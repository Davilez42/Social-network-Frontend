import "./viewprofile.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function ViewProfile() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Vista Perfil -- Nilson</h1>
      <NavLink to="/home/profile/edit">Editar perfil</NavLink>
      <p
        onClick={() => {
          window.sessionStorage.removeItem("tkn");
          navigate("/login");
        }}
      >
        Cerrar sesion
      </p>
    </>
  );
}

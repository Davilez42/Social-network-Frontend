import React from "react";
import "./navbarside.css";
import { NavLink } from "react-router-dom";
export default function NavBarSide() {
  return (
    <>
      <div className="container-navbar-side">
        <h1>NavbarSide</h1>
        <NavLink
          to="/"
          onClick={() => {
            window.sessionStorage.removeItem("tkn");
          }}
        >
          Cerrar sesion
        </NavLink>
      </div>
    </>
  );
}

export default function NavBarSide() {
  return (
    <div className="container-navbar-side">
    <h1>Navigate</h1>
    {/*agregar enlaces a diferentes secciones*/}
    <nav>
    <ul>
      <li><a href="/perfil">✔ Perfil</a></li>
      <li><a href="/amigos">✔ Amigos</a></li>
      <li><a href="/mensajes">✔ Mensajes</a></li>
      <li><a href="/grupos">✔ Grupos</a></li>
    </ul>
    </nav>
  </div>
);
}

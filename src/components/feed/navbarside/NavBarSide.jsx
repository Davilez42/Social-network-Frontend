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

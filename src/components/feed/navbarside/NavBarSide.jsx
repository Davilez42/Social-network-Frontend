import { useContext } from "react";
import { FaUser, FaEnvelope, FaSignOutAlt, FaCog } from "react-icons/fa";
import "./navbarside.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useCookies } from "react-cookie";
export default function NavBarSide() {
  const { username, url_avatar } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["tkn"]);

  return (
    <div className="container-navbar-side">
      <div className="container_side_avatar">
        <NavLink to="/home/profile/view">
          <img src={url_avatar} className="avatar loading" alt="" />
        </NavLink>
        <div className="container_alias">
          <p className="title_username">{username}</p>
        </div>
      </div>

      <nav className="list-items-main">
        <NavLink
          to="/home/profile/view"
          className="item_list_main"
          href="/perfil"
        >
          <FaUser className="icon" size={18} /> <p>Perfil</p>
        </NavLink>

        <NavLink className="item_list_main" href="/mensajes">
          <FaEnvelope className="icon" size={18} /> <p>Mensajes</p>
        </NavLink>

        <NavLink className="item_list_main" to="/home/profile/config">
          <FaCog className="icon" size={18} /> <p>Configuracion</p>
        </NavLink>

        <NavLink
          className="item_list_main item_logout"
          to="/login"
          onClick={() => {
            window.sessionStorage.removeItem("tkn");
            removeCookie("tkn");
          }}
        >
          <FaSignOutAlt className="icon" size={18} />{" "}
          <p className="text_logout">Cerrar sesion</p>
        </NavLink>
      </nav>
    </div>
  );
}

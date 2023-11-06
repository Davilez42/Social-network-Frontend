import React, { useContext } from "react";
import {
  FaUser,
  FaUsers,
  FaEnvelope,
  FaHandshake,
  FaCog,
} from "react-icons/fa";
import "./navbarside.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
export default function NavBarSide() {
  const { username, fullname, numberFriends, numberPosts, url_avatar } =
    useContext(UserContext);

  return (
    <div className="container-navbar-side">
      <div className="container_side_avatar">
        <NavLink to="/home/profile/view">
          <img src={url_avatar} className="avatar loading" alt="" />
        </NavLink>
        <div className="container_alias">
          <p className="title_name"> {fullname}</p>
          <p className="title_username">{username}</p>
        </div>
      </div>

      <div className="info_perfil">
        <div>
          <p className="item">{numberPosts}</p>
          Publicaciones
        </div>
        <div>
          <p className="item">{numberFriends}</p>
          Amigos
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

        <NavLink className="item_list_main" href="/grupos">
          <FaHandshake className="icon" size={18} /> <p>Grupos</p>
        </NavLink>

        <NavLink className="item_list_main" href="/configuracion">
          <FaCog className="icon" size={18} /> <p>Configuracion</p>
        </NavLink>
      </nav>
    </div>
  );
}

import React from "react";
import { FaUser, FaUsers, FaEnvelope,FaHandshake,FaCog} from 'react-icons/fa';
import "./navbarside.css";

export default function NavBarSide() {
  const numPublicaciones = 5; 
  const numSeguidores = 100; 
  const numSeguidos = 50;

  
  return (
    <div className="container-navbar-side">
      <div className="avatar">
        {/*  agregar AVATAR*/}
        <span className="avatar-content"></span>
      </div>
      <div className="nombre-persona">
        <p> RICARDO DARIO</p>
      </div>
      
      <div className="seccion-perfil">
        <li>Publicaciones {numPublicaciones}</li>
        <li>Seguidores {numSeguidores}</li>
        <li>Seguidos {numSeguidos}</li>
         
      </div>
      <nav>
        <ul>
          <li><a href="/perfil"><FaUser size={18}/>  Perfil</a></li>
          <li><a href="/amigos"><FaUsers size={18}/>  Amigos</a></li>
          <li><a href="/mensajes"><FaEnvelope size={18}/>  Mensajes</a></li>
          <li><a href="/grupos"><FaHandshake size={18}/>  Grupos</a></li>
          <li><a href="/configuracion"><FaCog size={18}/>  Configuracion</a></li>
        </ul>
      </nav>
    </div>
  );
}

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./headermain.css";
import { NavLink } from "react-router-dom";
export default function HeaderMain() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <header className="header-main">
        <div className="container_logo_navbar">
          <NavLink to="/home/feed" className="item">
            <p className="title-main title_logo_navbar">Snapwire</p>
          </NavLink>
        </div>
        <div className="search-bar">
          <input
            type="text"
            id="input_search"
            placeholder="Buscar..."
            value={searchQuery}
            d
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
          <div className="search-icon">
            <FaSearch />
          </div>
        </div>
        <nav className="navbar-box">
          <ul className="nav-list">
            <NavLink to="/home/feed" className="item-navbar-list">
              Inicio
            </NavLink>
            <NavLink className="item-navbar-list">Ayuda</NavLink>
            <NavLink className="item-navbar-list">Contactos</NavLink>
            <NavLink className="item-navbar-list">Acerca de nosotros</NavLink>
          </ul>
        </nav>
      </header>
    </>
  );
}

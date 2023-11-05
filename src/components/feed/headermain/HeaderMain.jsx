import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import "./headermain.css";

export default function HeaderMain() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // búsqueda o redirección a la página de resultados de búsqueda
    console.log("Realizar búsqueda con:", searchQuery);
  }

  return (
    <>
      <header className="header-main">
        <h1>Snapwire</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="search-icon">
              <FaSearch />
            </div>
          </form>
        </div>
        <nav>
          <ul className="nav-list">
            <li><a href="\home\feed">Inicio</a></li>
            <li><a href="\ayuda">Ayuda</a></li>
            <li><a href="\contactos">Contactos</a></li>
            <li><a href="\acerca-de">Acerca de</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
}

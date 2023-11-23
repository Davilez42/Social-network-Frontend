import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./headermain.css";
import { NavLink } from "react-router-dom";
import logo2 from "../../../assets/logo2.png";

export default function HeaderMain() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <header className="header-main">
        <div className="container_logo_navbar">
          <NavLink to="/home/feed" className="item">
            <img className="logo_snapwire_main" src={logo2} alt="" />
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
      </header>
    </>
  );
}

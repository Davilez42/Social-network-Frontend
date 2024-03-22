import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./inputSearch.css";

export default function InputSearch({ actionClose, actionSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          id="input_search"
          placeholder="Busca algo..."
          value={searchQuery}
          d
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              actionClose(false);
              actionSearch(searchQuery);
            }
          }}
          required
          className="input-field"
        />
        <div
          className="search-icon"
          onClick={() => {
            actionClose(false);
            actionSearch(searchQuery);
          }}
        >
          <FaSearch />
        </div>
      </div>
    </>
  );
}

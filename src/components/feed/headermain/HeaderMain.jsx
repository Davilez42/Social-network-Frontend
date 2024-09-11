import "./headermain.css";

import { FaBars } from "react-icons/fa";
export default function HeaderMain({ switchNavbarSideView }) {
  return (
    <>
      <header className="header-main">
        <div
          className="icon_list_main"
          onClick={() => {
            switchNavbarSideView();
          }}
        >
          <FaBars size={30} />
        </div>
      </header>
    </>
  );
}

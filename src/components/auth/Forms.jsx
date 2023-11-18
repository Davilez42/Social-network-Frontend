/* eslint-disable no-undef */
import { Outlet } from "react-router-dom";
import logo from "../../assets/type10.png";
import "./forms.css";
export default function Forms() {
  return (
    <>
      <div className="container-forms">
        <div className="mainform">
          <img className="logo_snapwire" src={logo} alt="" />
          {<Outlet />}
        </div>
      </div>
    </>
  );
}

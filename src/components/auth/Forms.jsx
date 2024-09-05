/* eslint-disable no-undef */
import { Outlet } from "react-router-dom";

import "./forms.css";
export default function Forms() {
  return <div className="mainform">{<Outlet />}</div>;
}

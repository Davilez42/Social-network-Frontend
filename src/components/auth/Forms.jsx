import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import "./forms.css";
export default function Forms() {
  return (
    <>
      <div className="container-forms">
        <div className="mainform">
          <p className="title-main">Snapwire</p>
          {<Outlet />}
        </div>
      </div>
    </>
  );
}

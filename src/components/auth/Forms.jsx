import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { UserContext } from "../../context/userContextRegister";
import "./forms.css";
export default function Forms() {
  const { errors, setErrors } = useContext(UserContext);
  return (
    <>
      <div className="container-forms">
        <div className="container-error">
          {errors.map((e, i) => (
            <div key={i} className="box-error">
              <div>{e}</div>{" "}
              <ImCross
                className="icon-close"
                onClick={() => {
                  setErrors([]);
                }}
              />
            </div>
          ))}
        </div>

        <div className="mainform">
          <p className="title-main">Snapwire</p>
          {<Outlet />}
        </div>
      </div>
    </>
  );
}

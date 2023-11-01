import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handler = () => {
      navigate("/login");
    };
    if (location.pathname === "/") {
      handler();
    }
  }, []);
  return (
    <div>
      <header></header>
      <div>{<Outlet />}</div>
    </div>
  );
}

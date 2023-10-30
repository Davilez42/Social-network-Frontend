import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => {
      navigate("/login");
    };
    handler();
  }, []);
  return (
    <div>
      <header></header>
      <div>{<Outlet />}</div>
    </div>
  );
}

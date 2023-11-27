import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UserContextProvider } from "../../context/userContext.jsx";
import { decryptDate } from "../../helpers/encrypt.js";
export default function ProtectedRoute() {
  const userAuth = decryptDate(useSelector((state) => state.auth.userAuth));
  useEffect(() => {}, []);

  if (!userAuth) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      {" "}
      <UserContextProvider>
        <Outlet />;
      </UserContextProvider>
    </>
  );
}

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UserContextProvider } from "../../context/userContext.jsx";

export default function ProtectedRoute() {
  const { session } = useSelector((state) => state.auth.userAuth);

  useEffect(() => {}, []);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}

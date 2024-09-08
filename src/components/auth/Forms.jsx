import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./forms.css";
export default function Forms() {
  return (
    <div className="mainform">
      <GoogleOAuthProvider clientId="82745131280-8af143ou1u2l50hhmrqklle47cpoeajr.apps.googleusercontent.com">
        {<Outlet />}
      </GoogleOAuthProvider>
    </div>
  );
}

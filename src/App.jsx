import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile";
import { CookiesProvider } from "react-cookie";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import Forms from "./components/auth/Forms";
import ConfirmVerifiedCode from "./components/auth/confirmverifiedcode/ConfirmVerifiedCode";
import EditFormProfile from "./components/user/EditFormProfile/EditFormProfile";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import RestorePassword from "./components/auth/restorePassword/RestorePassword";
import CreateNewPasswordReset from "./components/auth/createNewPasswordReset/CreateNewPasswordReset";
import Help from "./pages/Help";
import Home from "./pages/Home";
import FeedMain from "./components/feed/viewMain/FeedMain";
import ViewProfile from "./components/user/ViewProfile/ViewProfile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewConfiguration from "./components/user/viewConfiguration/ViewConfiguration";
import Index from "./pages/Index";
import Center from "./components/help/Center";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <Forms />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/confirmEmail/:id_user/:name",
            props: true,
            element: <ConfirmVerifiedCode />,
          },
          {
            path: "/passwordRestore",
            element: <RestorePassword />,
          },
          {
            path: "/createNewPassword/:accesToken",
            element: <CreateNewPasswordReset />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "feed",
            element: <FeedMain />,
          },
          {
            path: "profile",
            element: <Profile />,
            children: [
              {
                path: "edit",
                props: true,
                element: <EditFormProfile />,
              },
              {
                path: "view",
                element: <ViewProfile />,
              },
              {
                path: "view/:id_user_view",
                element: <ViewProfile mode_foreign={true} />,
                props: true,
              },
              {
                path: "config",
                element: <ViewConfiguration />,
              },
            ],
          },
        ],
      },
      {
        path: "/help",
        element: <Help />,
        children: [{ path: "center", element: <Center /> }],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <GoogleOAuthProvider clientId="850844004503-ij5nnakoum3lr6tnetu1up7ost42pqi6.apps.googleusercontent.com">
          <RouterProvider router={routes} />
        </GoogleOAuthProvider>
      </CookiesProvider>
    </>
  );
}

export default App;

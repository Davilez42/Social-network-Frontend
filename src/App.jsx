import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Profile from "./pages/Profile";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import Forms from "./components/auth/Forms";
import ConfirmVerifiedCode from "./components/auth/confirmverifiedcode/ConfirmVerifiedCode";
import EditFormProfile from "./components/user/editFormProfile/EditFormProfile";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import RestorePassword from "./components/auth/restorePassword/RestorePassword";
import CreateNewPasswordReset from "./components/auth/createNewPasswordReset/CreateNewPasswordReset";
import Home from "./pages/Home";
import FeedMain from "./components/feed/viewMain/FeedMain";
import ViewProfile from "./components/user/ViewProfile/ViewProfile";
import ViewConfiguration from "./components/user/viewConfiguration/ViewConfiguration";
import Index from "./pages/Index";

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
            path: "/confirmEmail/:userId/:name",
            props: true,
            element: <ConfirmVerifiedCode />,
          },
          {
            path: "/passwordRestore",
            element: <RestorePassword />,
          },
          {
            path: "/newpass/:accesToken",
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
                path: "view/:userIdView",
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
    ],
  },
]);
function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RouterProvider router={routes} />
    </CookiesProvider>
  );
}

export default App;

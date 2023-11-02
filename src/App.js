import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Profile from "./pages/Profile";
import { CookiesProvider } from "react-cookie";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import Forms from "./components/auth/Forms";
import ConfirmEmail from "./components/auth/confirmEmail/ConfirmEmail";
import EditFormProfile from "./components/user/EditFormProfile/EditFormProfile";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import RedirectRouteIndex from "./components/utils/RedirectRouteIndex";
import RestorePassword from "./components/auth/restorePassword/RestorePassword";
import CreateNewPasswordReset from "./components/auth/createNewPasswordReset/CreateNewPasswordReset";
import Home from "./pages/Home";
import FeedMain from "./components/feed/viewMain/FeedMain";
import ViewProfile from "./components/user/ViewProfile/ViewProfile";

const routes = createBrowserRouter([

  {
    path: "",
    element: <RedirectRouteIndex />,
    children: [
      {
        path: '/',
        element: <Forms />,
        children: [
          {
            path: '/login',
            element: <Login />

          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/confirmEmail/:id_user/:name',
            props: true,
            element: <ConfirmEmail />,
          }, {
            path: '/passwordRestore',
            element: <RestorePassword />
          },
          {
            path: '/createNewPassword',
            element: <CreateNewPasswordReset />
          }
        ]
      }
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />,
        children: [
          {
            path: 'feed',
            element: <FeedMain />
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'edit/:id_user',
                props: true,
                element: <EditFormProfile />
              },
              {
                path: 'view',
                element: <ViewProfile />
              }
            ]
          }
        ]
      }
    ]
  }



])
function App() {
  return <>
    <React.StrictMode>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <RouterProvider router={routes} />
      </CookiesProvider>
    </React.StrictMode>
  </>
}

export default App;
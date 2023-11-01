import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import { CookiesProvider } from "react-cookie";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import Forms from "./components/auth/Forms";
import ConfirmEmail from "./components/auth/confirmEmail/ConfirmEmail";
import EditFormProfile from "./components/user/EditFormProfile/EditFormProfile";

const routes = createBrowserRouter([

  {
    path: "/",
    element: <Index />,
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
          }
        ]
      }
    ],
  },
  {
    path: '/profile',
    element: <Profile />,
    children: [
      {
        path: 'edit/:id_user',
        props: true,
        element: <EditFormProfile />
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
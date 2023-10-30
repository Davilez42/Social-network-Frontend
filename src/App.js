import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import Register from "./components/forms/register/Register";
import Login from "./components/forms/login/Login";
import Forms from "./components/forms/Forms";
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
          }
        ]
      }
    ],
  },

])
function App() {
  return <>
    <React.StrictMode>

      <RouterProvider router={routes} />

    </React.StrictMode>
  </>
}

export default App;
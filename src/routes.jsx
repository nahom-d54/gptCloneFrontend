import App from "./App";

import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: `/chat/:chatId`,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default AppRoutes;

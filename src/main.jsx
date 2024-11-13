import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import store from "./app/store";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={AppRoutes} />
    </StrictMode>
  </Provider>
);

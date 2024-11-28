// src/App.js
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token && window.location.pathname === "/login") {
      navigate("/");
    }
    if (
      !auth.token &&
      window.location.pathname !== "/auth/login" &&
      window.location.pathname !== "/auth/register"
    ) {
      navigate("/auth/login");
    }
  }, [auth, navigate]);

  return (
    <div className="bg-[#f4f4f4] dark:bg-gray-900">
      {auth.token && <Outlet />}
    </div>
  );
};

export default App;

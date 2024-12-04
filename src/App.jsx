// src/App.js
import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDarkMode } from "./hooks/useDarkMode";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [isDarkMode, toggleDarkMode] = useDarkMode();
  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

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
    <div className="bg-white dark:bg-gray-900">
      <button
        onClick={toggleDarkMode}
        className="z-[1000] fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-gray-500" />
        )}
      </button>
      {auth.token && <Outlet />}
    </div>
  );
};

export default App;

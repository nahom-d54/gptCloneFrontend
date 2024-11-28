import { useDarkMode } from "../hooks/useDarkMode";
import { Outlet } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect } from "react";

const AuthLayout = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  return (
    <div>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-gray-500" />
        )}
      </button>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

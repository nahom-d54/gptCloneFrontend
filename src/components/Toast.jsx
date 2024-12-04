import PropTypes from "prop-types";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../hooks/useDarkMode";

const Toast = ({ message, type }) => {
  const getTypeFunc = (type) => {
    switch (type) {
      case "success":
        return toast.success;
      case "error":
        return toast.error;
      case "warning":
        return toast.warning;
      default:
        return toast;
    }
  };
  const [isDarkMode] = useDarkMode();

  useEffect(() => {
    getTypeFunc(type)(message, {
      theme: isDarkMode ? "dark" : "light",
    });
  }, [message, type, isDarkMode]);

  return <ToastContainer position="top-right" autoClose={5000} />;
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning"]),
};

export default Toast;

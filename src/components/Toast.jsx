import PropTypes from "prop-types";

const Toast = ({ message, type }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className={`absolute p-4 rounded-md shadow-md ${getTypeStyles(type)}`}>
      {message}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning"]),
};

export default Toast;

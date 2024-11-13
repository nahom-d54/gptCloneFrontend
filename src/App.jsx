// src/App.js
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import { Outlet } from "react-router-dom";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#f4f4f4] dark:bg-gray-900">
      <Outlet />
    </div>
  );
};

export default App;

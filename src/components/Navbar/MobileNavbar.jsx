import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FiTv } from "react-icons/fi";
import { BiCameraMovie } from "react-icons/bi";
import "../Navbar/navbar.css";

const MobileNavbar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={`mobile-nav fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 
        ${hidden ? "translate-y-full" : "translate-y-0"}`}
    >
      <div className="icon-container">
        <NavLink
          to="/"
          className={({ isActive }) => `icons ${isActive ? "active" : ""}`}
        >
          <IoMdHome className="icon" /> Home
        </NavLink>
      </div>

      <div className="icon-container">
        <NavLink
          to="/movies"
          className={({ isActive }) => `icons ${isActive ? "active" : ""}`}
        >
          <BiCameraMovie className="icon" /> Movies
        </NavLink>
      </div>

      <div className="icon-container">
        <NavLink
          to="/tv"
          className={({ isActive }) => `icons ${isActive ? "active" : ""}`}
        >
          <FiTv className="icon" /> TV
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNavbar;

import React from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import "../Navbar/navbar.css";
import { FiTv } from "react-icons/fi";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <div className="mobile-nav">
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

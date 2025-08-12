import "../Navbar/navbar.css";
import { IoSunny } from "react-icons/io5";
import { useEffect, useState } from "react";
import { BsMoonStars } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ onSearch }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="navbar-container">
      <div className="desktop-nav">
        <NavLink to="/" className="logo">
          HoriFlix
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Movies
        </NavLink>
        <NavLink
          to="/tv"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          TV
        </NavLink>
      </div>

      <div className="nav-right">
        <SearchBar onSearch={onSearch} />

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <IoSunny className="themeIconSun" />
          ) : (
            <BsMoonStars className="themeIconMoon" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

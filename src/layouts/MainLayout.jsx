import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import Footer from "../components/Footer";
import "../components/Navbar/navbar.css";
import { searchMovies, searchTv } from "../services/api";

const MainLayout = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setIsSearching(true);
    try {
      const [movieResults, tvResults] = await Promise.all([
        searchMovies(query),
        searchTv(query),
      ]);
      setMovies(movieResults);
      setTv(tvResults);
      navigate("/");
    } catch (error) {
      console.error("Search error:", error);
      setMovies([]);
      setTv([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setMovies([]);
      setTv([]);
      setIsSearching(false);
    }
  }, [location]);

  return (
    <div className="content">
      <Navbar onSearch={handleSearch} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      <Outlet context={{ movies, tv, isSearching }} />
      <MobileNavbar />
      <Footer />
    </div>
  );
};

export default MainLayout;

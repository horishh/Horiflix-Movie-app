import React, { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import "../components/Card/movieCard.css";
import Carousel from "../components/Carousel";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const [popular, topRated, nowPlaying] = await Promise.all([
          getMovies("popular"),
          getMovies("top_rated"),
          getMovies("now_playing"),
        ]);

        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setNowPlayingMovies(nowPlaying);
      } catch (error) {
        console.error("Failed to load Movie data", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Carousel title="Popular Movies" items={popularMovies} />
      <Carousel title="Top Rated Movies" items={topRatedMovies} />
      <Carousel title="Now Playing Movies" items={nowPlayingMovies} />
      <MobileNavbar />
    </div>
  );
};

export default Movies;

import React, { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import { useOutletContext } from "react-router-dom";
import Carousel from "../components/Carousel";
import Card from "../components/Card/Card";
import Loading from "../components/Loading";

/**
 * Movies Component
 * - Displays popular, top-rated, and now-playing movies.
 * - Shows search results if provided via Outlet context.
 */
const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get search results passed from parent route
  const { movies: searchResults = [] } = useOutletContext() || {};

  useEffect(() => {
    if (!searchResults.length) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const [popular, topRated, nowPlaying] = await Promise.all([
            getMovies("popular"),
            getMovies("top_rated"),
            getMovies("now_playing"),
          ]);
          setPopularMovies(popular);
          setTopRatedMovies(topRated);
          setNowPlayingMovies(nowPlaying);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [searchResults]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {searchResults.length > 0 ? (
        <div className="search-results flex flex-wrap gap-4">
          {searchResults.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              type="movie"
              title={movie.title}
              poster_path={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.png"
              }
              date={movie.release_date}
              rating={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <>
          <Carousel title="Popular Movies" items={popularMovies} type="movie" />
          <Carousel
            title="Top Rated Movies"
            items={topRatedMovies}
            type="movie"
          />
          <Carousel
            title="Now Playing Movies"
            items={nowPlayingMovies}
            type="movie"
          />
        </>
      )}
    </div>
  );
};

export default Movies;

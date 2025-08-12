import React, { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import { useOutletContext } from "react-router-dom";
import Carousel from "../components/Carousel";
import Card from "../components/Card/Card";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { movies: searchResults = [] } = useOutletContext() || {};

  useEffect(() => {
    if (!searchResults.length) {
      const fetchMovies = async () => {
        setLoading(true);
        const [popular, topRated, nowPlaying] = await Promise.all([
          getMovies("popular"),
          getMovies("top_rated"),
          getMovies("now_playing"),
        ]);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setNowPlayingMovies(nowPlaying);
        setLoading(false);
      };
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [searchResults]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {searchResults.length > 0 ? (
        <div className="search-results flex flex-wrap gap-4">
          {searchResults.map((movie) => (
            <Card
              key={movie.id}
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
          <Carousel title="Popular Movies" items={popularMovies} />
          <Carousel title="Top Rated Movies" items={topRatedMovies} />
          <Carousel title="Now Playing Movies" items={nowPlayingMovies} />
        </>
      )}
    </div>
  );
};

export default Movies;

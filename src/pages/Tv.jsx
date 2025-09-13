import React, { useEffect, useState } from "react";
import { getTv } from "../services/api";
import { useOutletContext } from "react-router-dom";
import Carousel from "../components/Carousel";
import Card from "../components/Card/Card";
import Loading from "../assets/loading";

const Tv = () => {
  const [popularTv, setPopularTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [onAirTv, setOnAirTv] = useState([]);
  const [loading, setLoading] = useState(true);

  const { tv: searchResults = [] } = useOutletContext() || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!searchResults.length) {
      const fetchTvShows = async () => {
        setLoading(true);
        const [popular, topRated, onAir] = await Promise.all([
          getTv("popular"),
          getTv("top_rated"),
          getTv("on_the_air"),
        ]);
        setPopularTv(popular);
        setTopRatedTv(topRated);
        setOnAirTv(onAir);
        setLoading(false);
      };
      fetchTvShows();
    } else {
      setLoading(false);
    }
  }, [searchResults]);

  if (loading) return <Loading />;

  return (
    <div>
      {searchResults.length > 0 ? (
        <div className="search-results flex flex-wrap gap-4">
          {searchResults.map((show) => (
            <Card
              key={show.id}
              id={show.id}
              type="tv"
              title={show.name}
              poster_path={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                  : "/placeholder.png"
              }
              date={show.first_air_date}
              rating={show.vote_average}
            />
          ))}
        </div>
      ) : (
        <>
          <Carousel title="Popular TV" items={popularTv} type="tv" />
          <Carousel title="Top Rated TV" items={topRatedTv} type="tv" />
          <Carousel title="On The Air TV" items={onAirTv} type="tv" />
        </>
      )}
    </div>
  );
};

export default Tv;

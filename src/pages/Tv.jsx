import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { getTv } from "../services/api";
import Carousel from "../components/Carousel";

const Tv = () => {
  const [popularTv, setPopularTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [onAirTv, setOnAirTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTvShows = async () => {
      try {
        setLoading(true);
        setError(null);
        const [popular, topRated, onAir] = await Promise.all([
          getTv("popular"),
          getTv("top_rated"),
          getTv("on_the_air"),
        ]);

        setPopularTv(popular);
        setTopRatedTv(topRated);
        setOnAirTv(onAir);
      } catch (error) {
        console.error("Failed to load TV data", error);
      } finally {
        setLoading(false);
      }
    };

    loadTvShows();
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
      <Carousel title="Popular TV" items={popularTv} />
      <Carousel title="Top Rated TV" items={topRatedTv} />
      <Carousel title="On the Air TV" items={onAirTv} />
      <MobileNavbar />
    </div>
  );
};

export default Tv;

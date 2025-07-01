import Navbar from "../components/Navbar/Navbar";

import "../components/Navbar/Navbar.css";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import Movies from "./Movies";
import Tv from "./Tv";
import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import { getMovies } from "../services/api";

const Home = () => {
  const [bannerMovies, setBannerMovies] = useState([]);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBannerMovies = async () => {
      const data = await getMovies("popular");
      setBannerMovies(data);
      if (data.length > 0) {
        setBanner(data[Math.floor(Math.random() * data.length)]);
      }
    };

    fetchBannerMovies();
  }, []);

  useEffect(() => {
    if (bannerMovies.length === 0) return;

    const interval = setInterval(() => {
      const randomMovie =
        bannerMovies[Math.floor(Math.random() * bannerMovies.length)];
      setBanner(randomMovie);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerMovies]);

  return (
    <div>
      <Navbar />
      {banner && (
        <Banner
          title={banner?.title}
          poster_path={`https://image.tmdb.org/t/p/original${
            banner?.backdrop_path || banner?.poster_path || ""
          }`}
        />
      )}

      <Movies />
      <Tv />
      <MobileNavbar />
    </div>
  );
};

export default Home;

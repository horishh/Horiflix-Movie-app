import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Movies from "./Movies";
import Tv from "./Tv";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { getMovies } from "../services/api";
import { useOutletContext } from "react-router-dom";
import Card from "../components/Card/Card";

const BANNER_INTERVAL = 5000;

const Home = () => {
  const [bannerMovies, setBannerMovies] = useState([]);
  const [banner, setBanner] = useState(null);

  const { movies = [], tv = [], isSearching = false } = useOutletContext();
  const hasSearchResults = movies.length > 0 || tv.length > 0;

  const pickRandomBanner = (list) =>
    list[Math.floor(Math.random() * list.length)];

  useEffect(() => {
    const fetchBannerMovies = async () => {
      const data = await getMovies("popular");
      setBannerMovies(data);
      if (data.length > 0) {
        setBanner(pickRandomBanner(data));
      }
    };

    if (!isSearching && bannerMovies.length === 0) {
      fetchBannerMovies();
    }
  }, [isSearching, bannerMovies]);

  useEffect(() => {
    if (bannerMovies.length === 0) return;

    const interval = setInterval(() => {
      setBanner(pickRandomBanner(bannerMovies));
    }, BANNER_INTERVAL);

    return () => clearInterval(interval);
  }, [bannerMovies]);

  const renderCards = (list, type) => (
    <section>
      <h2 className="text-center pt-[20px]">{type}</h2>
      <div className="search-results flex flex-wrap gap-4">
        {list.map((item) => (
          <Card
            key={item.id}
            title={type === "Movies" ? item.title : item.name}
            poster_path={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "/placeholder.png"
            }
            date={type === "Movies" ? item.release_date : item.first_air_date}
            rating={item.vote_average}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div>
      {!isSearching && !hasSearchResults && banner && (
        <Banner
          title={banner?.title}
          poster_path={`https://image.tmdb.org/t/p/original${
            banner?.backdrop_path || banner?.poster_path || ""
          }`}
        />
      )}

      {isSearching && !hasSearchResults && (
        <p className="text-center pt-8 text-lg text-gray-500">
          No results found for your search.
        </p>
      )}

      {hasSearchResults ? (
        <>
          {movies.length > 0 && renderCards(movies, "Movies")}
          {tv.length > 0 && renderCards(tv, "TV Shows")}
        </>
      ) : (
        <>
          <Movies />
          <Tv />
          <MobileNavbar />
        </>
      )}
    </div>
  );
};

export default Home;

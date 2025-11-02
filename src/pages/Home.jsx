import { useEffect, useState, useCallback } from "react";
import Banner from "../components/Banner";
import Movies from "./Movies";
import Tv from "./Tv";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { getMovies, getTv } from "../services/api";
import { useOutletContext } from "react-router-dom";
import Card from "../components/Card/Card";

const BANNER_INTERVAL = 5000;

const Home = () => {
  const [bannerItems, setBannerItems] = useState([]);
  const [banner, setBanner] = useState(null);

  const { movies = [], tv = [], isSearching = false } = useOutletContext();
  const hasSearchResults = movies.length > 0 || tv.length > 0;

  // Utility: pick a random banner item
  const pickRandomBanner = useCallback(
    (list) => list[Math.floor(Math.random() * list.length)],
    []
  );

  // Fetch banner items when not searching
  useEffect(() => {
    const fetchBannerItems = async () => {
      try {
        const moviesData = await getMovies("popular");
        const tvData = await getTv("popular");
        const combined = [...moviesData, ...tvData];
        setBannerItems(combined);
        if (combined.length) setBanner(pickRandomBanner(combined));
      } catch (err) {
        console.error("Error fetching banner items:", err);
      }
    };

    if (!isSearching && bannerItems.length === 0) {
      fetchBannerItems();
    }
  }, [isSearching, pickRandomBanner, bannerItems.length]);

  // Rotate banner every 5 seconds
  useEffect(() => {
    if (!bannerItems.length) return;
    const interval = setInterval(() => {
      setBanner(pickRandomBanner(bannerItems));
    }, BANNER_INTERVAL);
    return () => clearInterval(interval);
  }, [bannerItems, pickRandomBanner]);

  // Render card sections for search results
  const renderCards = (list, type) => (
    <section>
      <h2 className="text-center pt-5">
        {type === "movie" ? "Movies" : "TV Shows"}
      </h2>
      <div className="search-results flex flex-wrap gap-4">
        {list.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            type={type}
            title={type === "movie" ? item.title : item.name}
            poster_path={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "/placeholder.png"
            }
            date={type === "movie" ? item.release_date : item.first_air_date}
            rating={item.vote_average}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div>
      {/* Banner section: shows only when not searching */}
      {!isSearching && !hasSearchResults && banner && (
        <Banner
          id={banner.id}
          type={banner.title ? "movie" : "tv"}
          title={banner?.title || banner?.name}
          poster_path={`https://image.tmdb.org/t/p/original${
            banner?.backdrop_path || banner?.poster_path || ""
          }`}
          overview={banner?.overview}
          rating={banner?.vote_average}
          genre_ids={banner?.genre_ids}
        />
      )}

      {/* Search results not found */}
      {isSearching && !hasSearchResults && (
        <p className="text-center pt-8 text-lg text-gray-500">
          No results found for your search.
        </p>
      )}

      {/* Render search results or default lists */}
      {hasSearchResults ? (
        <div className="md:flex">
          {movies.length > 0 && renderCards(movies, "movie")}
          {tv.length > 0 && renderCards(tv, "tv")}
        </div>
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

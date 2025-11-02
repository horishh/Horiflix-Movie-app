import React, { useEffect, useState } from "react";
import { getMovieImages, getTvImages } from "../services/api";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const Banner = ({
  id,
  type = "movie",
  title,
  poster_path,
  backdrop_path,
  overview,
  rating,
  genre_ids,
}) => {
  const [logo, setLogo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (genre_ids?.length) {
      const genreNames = genre_ids.map((id) => genreMap[id]).filter(Boolean);
      setGenres(genreNames);
    }
  }, [genre_ids]);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const images =
          type === "tv" ? await getTvImages(id) : await getMovieImages(id);
        const logos = images.logos || [];
        const englishLogo = logos.find((l) => l.iso_639_1 === "en") || logos[0];
        if (englishLogo) {
          setLogo(
            `https://image.tmdb.org/t/p/original${englishLogo.file_path}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch banner logo:", error);
      }
    };
    if (id) fetchLogo();
  }, [id, type]);

  const backgroundImage = isMobile
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : `https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`;

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-black/70 to-transparent z-0"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 z-10 p-6 md:p-10 max-w-2xl flex flex-col justify-end mb-10">
        {logo ? (
          <img src={logo} alt={title} className="w-auto mb-3 max-h-30" />
        ) : (
          <h2 className="text-4xl md:text-5xl font-bold mb-3">{title}</h2>
        )}

        {genres.length > 0 && (
          <p className="text-sm text-gray-300 mb-2">{genres.join(" • ")}</p>
        )}

        {rating && (
          <p className="text-yellow-400 text-sm mb-2">
            ⭐ {Math.floor(rating)} / 10
          </p>
        )}

        {overview && (
          <p className="text-base md:text-lg text-gray-200 max-w-2xl line-clamp-3">
            {overview}
          </p>
        )}
      </div>
    </div>
  );
};

export default Banner;

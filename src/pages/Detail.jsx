import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, getTvDetail } from "../services/api";
import "../components/Card/movieCard.css";
import { IoPlayCircleOutline } from "react-icons/io5";
import Loading from "../assets/loading";

/**
 * Detail component
 * - Fetches and displays details for a movie or TV show based on route params.
 * - Shows a loading spinner while fetching.
 * - Displays trailer link if available.
 */
const Detail = () => {
  const { id, type } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data depending on type
        const data =
          type === "tv" ? await getTvDetail(id) : await getMovieDetail(id);
        setItem(Array.isArray(data) ? null : data);
      } catch (error) {
        console.error("Failed to fetch details:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  if (!item) return <div>{type === "tv" ? "TV Show" : "Movie"} not found.</div>;

  // Find trailer video from YouTube
  const trailer = item?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="md:grid-cols-3 gap-6">
      <div className="w-full relative overflow-hidden">
        {/* Backdrop image */}
        <div
          className="backdrop absolute inset-0 bg-cover bg-center"
          role="img"
          aria-label="Movie backdrop"
          style={{
            "--backdrop-url": item.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
              : "none",
            "--poster-url": item.poster_path
              ? `url(https://image.tmdb.org/t/p/w500${item.poster_path})`
              : "none",
          }}
        ></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 h-full"></div>

        {/* Detail content */}
        <div className="movie-detail-container flex justify-self-start items-center relative w-[300px] text-2xl md:text-xs text-white/90 h-[100dvh] p-5">
          <div>
            {/* Title */}
            <h1 className="text-3xl font-extrabold mb-2">
              {item.title || item.name}
            </h1>
            {/* Tagline */}
            {item.tagline && (
              <h3 className="italic text-[#f59e0b] mb-4 text-1xl">
                "{item.tagline}"
              </h3>
            )}
            {/* Overview */}
            <p className="mb-4 w-full line-clamp-5">
              {item.overview || "No overview available."}
            </p>
            {/* Additional details */}
            <p className="mb-2">
              <strong className="text-[#f59e0b]">Release Date:</strong>{" "}
              {(item.release_date || item.first_air_date)?.slice(0, 4)}
            </p>
            <p className="mb-2">
              <strong className="text-[#f59e0b]">Popularity:</strong>{" "}
              {item.popularity}
            </p>
            <p className="mb-2">
              <strong className="text-[#f59e0b]">Rating:</strong>{" "}
              {Math.floor(item.vote_average)} / 10
            </p>
            <p className="mb-2">
              <strong className="text-[#f59e0b]">Genres:</strong>{" "}
              {item.genres?.map((g) => g.name).join(", ") || "N/A"}
            </p>

            {/* Trailer button */}
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Watch Trailer on YouTube"
                className="trailer-btn group inline-flex items-center gap-2 text-[#f59e0b] cursor-pointer w-[150px] h-[50px] rounded-xl pl-1"
              >
                <IoPlayCircleOutline className="icon md:text-3xl text-6xl transition-transform duration-300" />
                <span className="text whitespace-nowrap text-white text-sm transition-all duration-500">
                  Watch Trailer
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

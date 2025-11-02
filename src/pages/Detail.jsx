import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetail,
  getTvDetail,
  getMovieImages,
  getTvImages,
} from "../services/api";
import { IoPlayCircleOutline } from "react-icons/io5";
import Loading from "../components/Loading";

const Detail = () => {
  const { id, type } = useParams();
  const [item, setItem] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data =
          type === "tv" ? await getTvDetail(id) : await getMovieDetail(id);
        setItem(Array.isArray(data) ? null : data);

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
        console.error("Failed to fetch details:", error);
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

  const trailer = item?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="w-full bg-[#141414] text-white overflow-hidden">
      {/* 🔹 Poster/Backdrop Section */}
      <div className="relative w-full h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: item.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
              : item.poster_path
              ? `url(https://image.tmdb.org/t/p/original${item.poster_path})`
              : "none",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/70 to-[#141414]"></div>
      </div>

      {/* 🔹 Detail Section */}
      <div className="relative z-10 -mt-70 pl-6 pr-2 pb-6 flex flex-col items-start text-left max-w-[1200px]">
        {logo ? (
          <img
            src={logo}
            alt={item.title || item.name}
            className="w-auto max-h-[80px] mb-6"
          />
        ) : (
          <h1 className="text-4xl font-extrabold mb-4">
            {item.title || item.name}
          </h1>
        )}

        {item.tagline && (
          <h3 className="italic text-[#f59e0b] mb-6 text-lg">
            “{item.tagline}”
          </h3>
        )}

        <p className="mb-6 text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl">
          {item.overview || "No overview available."}
        </p>

        <div className="space-y-2 text-xs md:text-sm text-gray-300">
          <p>
            <strong className="text-[#f59e0b]">Release Date:</strong>{" "}
            {(item.release_date || item.first_air_date)?.slice(0, 4)}
          </p>
          <p>
            <strong className="text-[#f59e0b]">Popularity:</strong>{" "}
            {item.popularity}
          </p>
          <p>
            <strong className="text-[#f59e0b]">Rating:</strong>{" "}
            {Math.floor(item.vote_average)} / 10
          </p>
          <p>
            <strong className="text-[#f59e0b]">Genres:</strong>{" "}
            {item.genres?.map((g) => g.name).join(", ") || "N/A"}
          </p>
        </div>

        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-[#f59e0b] hover:text-white transition-colors relative z-50"
          >
            <IoPlayCircleOutline className="text-5xl" />
            <span className="text-sm font-medium">Watch Trailer</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default Detail;

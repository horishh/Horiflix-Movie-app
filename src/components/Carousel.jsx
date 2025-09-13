import React, { useRef } from "react";
import Card from "./Card/Card";

const Carousel = ({ title, items = [], type = "movie" }) => {
  const carouselRef = useRef(null);

  const scroll = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-[-20px]">
      <h2 className="text-center text-xl font-semibold mb-6 pt-5">{title}</h2>

      <div className="relative max-w-[1400px] mx-auto carousel-mobile">
        <div
          ref={carouselRef}
          className="carousel overflow-x-auto overflow-y-hidden flex flex-row gap-1 h-[400px] px-5 rounded-xl max-w-full"
          style={{ maxWidth: "100%", whiteSpace: "nowrap" }}
        >
          {items.map((item) => (
            <div key={item.id} className="inline-block mr-4 align-top">
              <Card
                id={item.id}
                type={type}
                poster_path={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.title || item.name}
                date={item.release_date || item.first_air_date}
                rating={item.vote_average}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(-300)}
          aria-label="Scroll left"
          className="absolute top-40 left-4 bg-amber-500 rounded-xl py-1.5 px-5 text-sm cursor-pointer hover:scale-105 transition-transform carousel-btn"
        >
          &larr;
        </button>
        <button
          onClick={() => scroll(300)}
          aria-label="Scroll right"
          className="absolute top-40 right-4 bg-amber-500 rounded-xl py-1.5 px-5 text-sm cursor-pointer hover:scale-105 transition-transform carousel-btn"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Carousel;

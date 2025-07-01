import React from "react";

const Banner = ({ title, poster_path }) => {
  return (
    <div className="relative w-full h-[100%] min-h-[300px] max-h-[450px] mb-4">
      <img
        className="w-full h-[100%] max-h-[450px] min-h-[300px] object-cover"
        src={poster_path}
        alt={title}
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6 text-white">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default Banner;

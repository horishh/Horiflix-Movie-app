import React from "react";
import { IoIosStar } from "react-icons/io";
import "./movieCard.css";

const Card = ({ title, poster_path, date, rating }) => {
  return (
    <div className="card w-[200px] flex flex-col shadow-md text-center rounded-lg cursor-pointer overflow-hidden ml-1">
      <img
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
        src={poster_path}
        alt={title}
        onError={(e) => (e.target.src = "/placeholder.png")}
      />
      <div className="flex flex-col justify-between flex-1 pt-5">
        <h3 className="text-md font-medium mt-auto px-2 line-clamp-1">
          {title}
        </h3>
        <div className="flex justify-between items-center text-sm px-2 py-2 mt-auto">
          <span>{date?.slice(0, 4)}</span>
          <span className="flex items-center gap-1">
            <IoIosStar className=" text-yellow-500" />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

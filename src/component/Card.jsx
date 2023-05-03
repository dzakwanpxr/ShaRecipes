import React from "react";
import defaultFood from "../assets/food-bg.png";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg lg:max-w-sm">
      <Link to={item.id}>
        <img
          className="rounded-t-lg object-cover w-full h-60"
          src={item.image ? item.image : defaultFood}
          alt="food-bg"
        />

        <div className="p-5 flex justify-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
            {item.title}
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default Card;

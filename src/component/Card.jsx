import React from "react";
import defaultFood from "../assets/food-bg.png";

const Card = () => {
  return (
    <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg lg:max-w-sm">
      <img className="rounded-t-lg" src={defaultFood} alt="food-bg" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
          Tamagoyaki
        </h5>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import defaultFood from "../assets/food-bg.png";
import { MdEdit, MdDelete } from "react-icons/md";

const MyCard = () => {
  return (
    <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg lg:max-w-sm">
      <img className="rounded-t-lg" src={defaultFood} alt="food-bg" />
      <div className=" p-5">
        <div className="flex items-center">
          {" "}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 me-auto">
            Tamagoyaki
          </h5>
          <a href="">
            <MdEdit />
          </a>
          <a href="">
            <MdDelete color="red" />
          </a>
        </div>
        <a href="">
          <p className="text-xs underline">See Full Recipe</p>
        </a>
      </div>
      <p></p>
    </div>
  );
};

export default MyCard;

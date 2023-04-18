import React from "react";
import defaultFood from "../assets/food-bg.png";
import { MdOutlineTimer, MdRoomService, MdThumbUp } from "react-icons/md";

const CardDetail = () => {
  return (
    <section className="p-10">
      <img
        className="w-full object-cover xl:h-96 mb-5"
        src={defaultFood}
        alt="recipe-img"
      />
      <h1 className="text-3xl font-bold mb-5">{}</h1>
      <div className="recipe-info flex gap-2 mb-2 md:gap-5">
        <span className="text-primary">
          <MdOutlineTimer color="red" className="inline" /> 20 mins
        </span>
        <span className="text-primary">
          <MdRoomService color="red" className="inline" /> Serving Up To 2
        </span>
        <span className="text-primary">
          <MdThumbUp color="red" className="inline" /> 235
        </span>
      </div>
      <hr className="mb-2" />
      <p className="mb-5 text-justify">{}</p>
      <div className="recipe-ingredients mb-5">
        <h1 className="text-3xl font-bold text-primary mb-5">Ingredients</h1>
        <ul className="list-disc">
          <li>1/4 cup warm water</li>
          <li>1/4 cup warm water</li>
          <li>1/4 cup warm water</li>
        </ul>
      </div>
      <div className="recipe-instructions mb-5">
        <h1 className="text-3xl font-bold text-primary mb-5">Instructions</h1>
        <ul className="list-decimal">
          <li>1/4 cup warm water</li>
          <li>1/4 cup warm water</li>
          <li>1/4 cup warm water</li>
          <li>
            Pour the seasonings mixture into the eggs and whisk gently. Then
            pour the mixture into a measuring cup with a spout and handle so
            that it'll be easier to pour into the frying pan.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CardDetail;

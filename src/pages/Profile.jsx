import React from "react";
import createRecipe from "../assets/createRecipe.png";
import MyCard from "../component/MyCard";
import Button from "../component/Button";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create");
  };
  return (
    <section className="p-10">
      <h1 className="text-3xl font-bold mb-5">My Recipes</h1>
      <div className="flex flex-col items-center gap-5">
        <img src={createRecipe} alt="create-recipe-img" />
        <p className="text-center">
          You don’t have any recipes posted yet :( Let’s create one!
        </p>
        <Button
          className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 md:max-w-1/12 "
          label="Create Recipe"
          onClick={handleClick}
        />
      </div>
      {/* <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Recipes</h1>
        <Button
          className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 md:max-w-1/12 "
          label="Create Recipe"
          onClick={handleClick}
        />
      </div>
      <div className="card-container flex flex-row flex-wrap mt-10 gap-y-10 md:gap-x-4 lg:gap-x-5">
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
      </div> */}
    </section>
  );
};

export default Profile;

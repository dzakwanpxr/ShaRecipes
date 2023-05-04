import React, { useState } from "react";
import { useForm } from "react-hook-form";
import searchImg from "../assets/Search.png";
import Card from "../component/Card";
import Button from "../component/Button";
import Spinner from "../component/Spinner";
import { gql, useSubscription } from "@apollo/client";
import { dishTypesOptions, cuisineOptions } from "../formOptions";

const GET_RECIPES = gql`
  subscription GetRecipes {
    recipes {
      cuisines
      dishTypes
      id
      image
      title
    }
  }
`;

const Recipes = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data, loading } = useSubscription(GET_RECIPES);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dishType, setDishType] = useState("");
  const recipes = data?.recipes || [];

  const onSubmit = (data) => {
    setSearch(data.search || "");
    setCuisine(data.cuisines || "");
    setDishType(data.dishTypes || "");
  };

  const onReset = () => {
    reset();
    setSearch("");
    setCuisine("");
    setDishType("");
  };

  if (loading) {
    return <Spinner />;
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const isTitleMatch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const isCuisineMatch = cuisine ? recipe.cuisines === cuisine : true;
    const isDishTypeMatch = dishType ? recipe.dishTypes === dishType : true;
    return isTitleMatch && isCuisineMatch && isDishTypeMatch;
  });

  const renderedRecipes =
    filteredRecipes.length > 0
      ? filteredRecipes
      : filteredRecipes.length === 0
      ? []
      : recipes;

  return (
    <section className="p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative md:w-5/12">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              id="search"
              name="search"
              placeholder="Search Recipes"
              {...register("search")}
            />
          </div>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:w-3/12"
            {...register("cuisines")}
            defaultValue=""
          >
            <option disabled value="">
              Cuisines
            </option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>

          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:w-3/12"
            {...register("dishTypes")}
            defaultValue=""
          >
            <option disabled value="">
              Dish Type
            </option>
            {dishTypesOptions.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <Button
            className="focus:outline-none bg-white text-primary hover:bg-red-100 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-7 py-2.5 md:max-w-1/12"
            label="Reset"
            onClick={onReset}
          />
          <Button
            className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-7 py-2.5 md:max-w-1/12"
            label="Search"
          />
        </div>
      </form>
      <h1 className="text-3xl font-bold mt-5">Latest Recipes</h1>

      <div className="card-container flex flex-row flex-wrap mt-5 gap-y-10 lg:gap-x-20">
        {renderedRecipes.length > 0 ? (
          renderedRecipes
            .slice()
            .reverse()
            .map((recipe) => <Card key={recipe.id} item={recipe} />)
        ) : (
          <div className="flex flex-col items-center h-screen">
            <img src={searchImg} alt="search-img" className="w-4/5 md:w-1/3" />
            <p>No recipes found. Please refine your search or try again.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recipes;

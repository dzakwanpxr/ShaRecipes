import React from "react";
import { useForm } from "react-hook-form";
import Card from "../component/Card";
import Button from "../component/Button";
import { gql, useQuery } from "@apollo/client";

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      aggregateLikes
      cuisines
      dishTypes
      extendedIngredients
      id
      image
      instructions
      readyInMinutes
      servings
      summary
      title
    }
  }
`;

const Recipes = () => {
  const { register, handleSubmit } = useForm();
  const { data, loading, error } = useQuery(GET_RECIPES);

  const cuisineOptions = [
    "African",
    "American",
    "Asian",
    "Caribbean",
    "European",
    "Latin American",
    "Mediterranean",
    "Middle Eastern",
  ];

  const dishTypes = [
    { value: "main course", label: "Main Course" },
    { value: "side dish", label: "Side Dish" },
    { value: "dessert", label: "Dessert" },
    { value: "appetizer", label: "Appetizer" },
    { value: "breakfast", label: "Breakfast" },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

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
            {dishTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <Button
            className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-7 py-2.5 md:max-w-1/12"
            label="Search"
          />
        </div>
      </form>
      <h1 className="text-3xl font-bold mt-5">Latest Recipes</h1>
      <div className="card-container flex flex-row flex-wrap mt-5  gap-y-10 md:gap-x-4 lg:gap-x-5">
        {data?.recipes.map((recipe) => (
          <Card key={recipe.id} item={recipe} />
        ))}
      </div>
    </section>
  );
};

export default Recipes;

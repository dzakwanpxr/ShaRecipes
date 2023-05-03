import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../component/Card";
import Button from "../component/Button";
import Spinner from "../component/Spinner";
import { gql, useSubscription, useLazyQuery } from "@apollo/client";
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

const SEARCH_RECIPES_AND = gql`
  query SearchRecipe($dishTypes: String, $cuisines: String, $title: String) {
    recipes(
      where: {
        title: { _ilike: $title }
        _and: [
          { cuisines: { _eq: $cuisines } }
          { dishTypes: { _eq: $dishTypes } }
        ]
      }
    ) {
      cuisines
      dishTypes
      id
      image
      title
    }
  }
`;

const SEARCH_RECIPES_OR = gql`
  query SearchRecipe($dishTypes: String, $cuisines: String, $title: String) {
    recipes(
      where: {
        title: { _ilike: $title }
        _or: [
          { cuisines: { _eq: $cuisines } }
          { dishTypes: { _eq: $dishTypes } }
        ]
      }
    ) {
      cuisines
      dishTypes
      id
      image
      title
    }
  }
`;

const SEARCH_RECIPES_TITLE = gql`
  query SearchRecipe($dishTypes: String, $cuisines: String, $title: String) {
    recipes(where: { title: { _ilike: $title } }) {
      cuisines
      dishTypes
      id
      image
      title
    }
  }
`;

const Recipes = () => {
  const { register, handleSubmit } = useForm();
  const [searchRecipesAnd, { data: searchDataAnd, loading: searchLoadingAnd }] =
    useLazyQuery(SEARCH_RECIPES_AND);
  const [searchRecipesOr, { data: searchDataOr, loading: searchLoadingOr }] =
    useLazyQuery(SEARCH_RECIPES_OR);
  const { data, loading } = useSubscription(GET_RECIPES);

  const onSubmit = (data) => {
    if (data.dishTypes && data.cuisines) {
      searchRecipesAnd({
        variables: {
          title: `%${data.search}%`,
          dishTypes: data.dishTypes,
          cuisines: data.cuisines,
        },
      });
      console.log("jalan and");
    } else {
      searchRecipesOr({
        variables: {
          title: `%${data.search}%`,
          dishTypes: data.dishTypes,
          cuisines: data.cuisines,
        },
      });

      console.log("jalan or");
    }
  };

  if (loading || searchLoadingAnd || searchLoadingOr) {
    return <Spinner />;
  }

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
            className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-7 py-2.5 md:max-w-1/12"
            label="Search"
          />
        </div>
      </form>
      <h1 className="text-3xl font-bold mt-5">Latest Recipes</h1>

      {searchDataAnd?.recipes || searchDataOr?.recipes ? (
        <div className="card-container flex flex-row flex-wrap mt-5 gap-y-10 lg:gap-x-20 ">
          {(searchDataAnd?.recipes || searchDataOr?.recipes)
            ?.slice()
            .reverse()
            .map((recipe) => (
              <Card key={recipe.id} item={recipe} />
            ))}
        </div>
      ) : (
        <div className="card-container flex flex-row flex-wrap mt-5 gap-y-10 md:justify-between">
          {data?.recipes
            .slice()
            .reverse()
            .map((recipe) => (
              <Card key={recipe.id} item={recipe} />
            ))}
        </div>
      )}
    </section>
  );
};

export default Recipes;

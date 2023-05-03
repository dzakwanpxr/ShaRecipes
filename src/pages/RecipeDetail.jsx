import React from "react";
import defaultFood from "../assets/food-bg.png";
import Spinner from "../component/Spinner";
import {
  MdOutlineTimer,
  MdRoomService,
  MdThumbUp,
  MdArrowBack,
} from "react-icons/md";
import { useQuery, gql } from "@apollo/client";
import parse from "html-react-parser";
import { Link, useParams, useNavigate } from "react-router-dom";

const GET_RECIPE = gql`
  query GetRecipe($id: String!) {
    recipes(where: { id: { _eq: $id } }) {
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

const RecipeDetail = () => {
  const id = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: id,
  });

  if (loading) {
    return <Spinner />;
  }

  if (!error && !loading) {
    const recipe = data?.recipes[0];

    const ingredientArray = recipe.extendedIngredients.split(",");
    const ingredientListItems = ingredientArray.map((ingredient, index) => (
      <li key={index}>{ingredient}</li>
    ));

    const instructionArray = recipe.instructions.split(",");
    const instructionsListItems = instructionArray.map((instruction, index) => (
      <li key={index}>{instruction}</li>
    ));
    return (
      <section className="px-10 py-5">
        <div
          className="flex flex-row gap-2 mb-5 items-center hover:underline underline-offset-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack size={16} />
          <p className="text-sm">Back to all recipes</p>
        </div>

        <img
          className="w-full object-cover xl:h-96 mb-5"
          src={recipe.image ? recipe.image : defaultFood}
          alt="recipe-img"
        />
        <h1 className="text-3xl font-bold mb-5">{recipe.title}</h1>
        <div className="recipe-info flex gap-2 mb-2 md:gap-5">
          <span className="text-primary">
            <MdOutlineTimer color="red" className="inline" />{" "}
            {recipe.readyInMinutes} minutes
          </span>
          <span className="text-primary">
            <MdRoomService color="red" className="inline" /> Serving Up To{" "}
            {recipe.servings} People
          </span>
          <span className="text-primary">
            <MdThumbUp color="red" className="inline" /> {recipe.aggregateLikes}
          </span>
        </div>
        <hr className="mb-2" />
        <p className="mb-5 text-justify">{parse(recipe.summary)}</p>
        <div className="recipe-ingredients mb-5">
          <h1 className="text-3xl font-bold text-primary mb-5">Ingredients</h1>
          <ul className="list-disc">{ingredientListItems}</ul>
        </div>
        <div className="recipe-instructions mb-5">
          <h1 className="text-3xl font-bold text-primary mb-5">Instructions</h1>
          <ul className="list-decimal">{instructionsListItems}</ul>
        </div>
      </section>
    );
  }
};

export default RecipeDetail;

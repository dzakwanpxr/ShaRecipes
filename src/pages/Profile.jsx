import React, { useContext } from "react";
import createRecipe from "../assets/createRecipe.png";
import MyCard from "../component/MyCard";
import Button from "../component/Button";
import Spinner from "../component/Spinner";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { gql, useQuery, useSubscription } from "@apollo/client";

const USER_RECIPE = gql`
  subscription UserRecipe($user_id: uuid!) {
    recipes(where: { user_id: { _eq: $user_id } }) {
      id
      image
      title
    }
  }
`;

const Profile = () => {
  const { fullName, userID } = useContext(AuthContext);
  const firstName = fullName.split(" ")[0];

  const navigate = useNavigate();

  const { loading, data } = useSubscription(USER_RECIPE, {
    variables: { user_id: userID },
  });

  const handleClick = () => {
    navigate("/create");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="p-10 h-screen">
      {data?.recipes.length === 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-5">{firstName}'s Recipes</h1>
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
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{firstName}'s Recipes</h1>
            <Button
              className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 md:max-w-1/12 "
              label="Create Recipe"
              onClick={handleClick}
            />
          </div>
          <div className="card-container flex flex-row flex-wrap mt-5 gap-y-10 lg:gap-x-20">
            {data?.recipes.map((recipe) => (
              <MyCard key={recipe.id} item={recipe} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;

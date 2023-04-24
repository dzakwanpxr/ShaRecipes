import React from "react";
import defaultFood from "../assets/food-bg.png";
import { MdEdit, MdDelete } from "react-icons/md";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: String!) {
    delete_recipes_by_pk(id: $id) {
      id
      title
    }
  }
`;

const Card = ({ item }) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const handleDelete = (e) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete ${item.title}`) == true) {
      deleteRecipe({ variables: { id: item.id } });
    }
  };
  return (
    // <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg lg:max-w-sm">
    //   <img
    //     className="rounded-t-lg"
    //     src={item.image ? item.image : defaultFood}
    //     alt="food-bg"
    //   />
    //   <div className="p-5 ">
    //     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
    //       {item.title}
    //     </h5>
    //   </div>
    // </div>

    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg lg:max-w-sm">
      <Link to={item.id}>
        <img
          className="rounded-t-lg object-cover w-full h-60"
          src={item.image ? item.image : defaultFood}
          alt="food-bg"
        />

        <div className="p-5 flex justify-between">
          <div className="card-text">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 me-auto">
              {item.title}
            </h5>
            <Link to={item.id}>
              <p className="text-xs underline">See Full Recipe</p>
            </Link>
          </div>
          <div className="flex card-icon">
            <Link to={`/edit-recipe/${item.id}`}>
              <MdEdit size={24} />
            </Link>
            <MdDelete
              color="red"
              size={24}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;

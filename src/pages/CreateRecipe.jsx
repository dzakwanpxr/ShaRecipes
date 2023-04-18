import React from "react";
import { MdImage } from "react-icons/md";
import { useForm } from "react-hook-form";
import Button from "../component/Button";

const CreateRecipe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cuisineOptions = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const dishTypes = [
    { value: "main course", label: "Main Course" },
    { value: "side dish", label: "Side Dish" },
    { value: "dessert", label: "Dessert" },
    { value: "appetizer", label: "Appetizer" },
    { value: "salad", label: "Salad" },
    { value: "bread", label: "Bread" },
    { value: "breakfast", label: "Breakfast" },
    { value: "soup", label: "Soup" },
    { value: "beverage", label: "Beverage" },
    { value: "sauce", label: "Sauce" },
    { value: "marinade", label: "Marinade" },
    { value: "fingerfood", label: "Fingerfood" },
    { value: "snack", label: "Snack" },
    { value: "drink", label: "Drink" },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">Create New Recipe</h1>
          <Button
            className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 md:max-w-1/12"
            label="Save Recipe"
          />
        </div>

        <div className="flex items-center justify-center w-full mb-3">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
          >
            <div className="flex flex-col items-center justify-center py-6">
              <MdImage size={48} />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG or JPG only</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register("image")}
            />
          </label>
        </div>

        <div className="flex flex-col w-full mb-3">
          <input
            type="text"
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Title"
            {...register("title", {
              required: "Title is required",
            })}
          />
          <p className="text-primary text-sm">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col w-full mb-3">
          <input
            type="text"
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          <p className="text-primary text-sm">{errors.description?.message}</p>
        </div>
        <div className="flex mb-3">
          <select
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3 me-5"
            {...register("cuisines")}
            defaultValue=""
          >
            <option disabled value="">
              Cuisines (optional)
            </option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>

          <select
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            {...register("dishTypes")}
            defaultValue=""
          >
            <option disabled value="">
              Dish Type (optional)
            </option>
            {dishTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full mb-3">
          <h1 className="text-3xl font-bold text-primary mb-5">Ingredients</h1>
          <textarea
            type="text"
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Ingredients"
            {...register("ingredients", {
              required: "Ingredients is required",
            })}
          />
          <p className="text-primary text-sm">{errors.ingredients?.message}</p>
        </div>
        <div className="flex flex-col w-full mb-3">
          <h1 className="text-3xl font-bold text-primary mb-5">Instructions</h1>
          <textarea
            type="text"
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Instructions"
            {...register("instructions", {
              required: "Instructions is required",
            })}
          />
          <p className="text-primary text-sm">{errors.instructions?.message}</p>
        </div>
      </form>
    </section>
  );
};

export default CreateRecipe;

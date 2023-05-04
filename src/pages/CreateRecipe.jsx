import React, { useState, useContext } from "react";
import { MdImage } from "react-icons/md";
import { useForm } from "react-hook-form";
import Button from "../component/Button";
import { gql, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";
import { dishTypesOptions, cuisineOptions } from "../formOptions";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";

const INSERT_RECIPE = gql`
  mutation InsertRecipe($object: recipes_insert_input!) {
    insert_recipes_one(object: $object) {
      id
      title
    }
  }
`;

const CreateRecipe = () => {
  const [percent, setPercent] = useState(0);
  const [fileName, setFileName] = useState("");
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [insertRecipe] = useMutation(INSERT_RECIPE);

  const onSubmit = (data) => {
    const storageRef = ref(storage, `/files/${data.image[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, data.image[0]);
    setFileName(data.image[0].name);

    uploadTask.on(
      "state_changed",
      //upload progress
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },

      //upload gagal
      (err) => {
        console.log(err);
      },
      //upload selesai
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          insertRecipe({
            variables: {
              object: {
                id: nanoid(6),
                title: data.title,
                readyInMinutes: data.readyInMinutes,
                servings: data.servings,
                summary: data.summary,
                instructions: data.instructions,
                extendedIngredients: data.ingredients,
                dishTypes: data.dishTypes === "" ? null : data.dishTypes,
                cuisines: data.cuisines === "" ? null : data.cuisines,
                image: url,
                user_id: userID,
              },
            },
          });
          navigate("/profile");
        });
      }
    );
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
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          >
            {percent === 0 ? (
              <div className="flex flex-col items-center justify-center py-6">
                <MdImage size={48} />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PNG or JPG only</p>
                <p className="text-primary text-sm">{fileName}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                {percent < 100 ? (
                  <>
                    <p className="text-2xl text-primary font-bold mb-2">
                      {percent}%
                    </p>
                    <div className="w-full h-4 mb-4 bg-gray-200">
                      <div
                        className="h-4 bg-primary"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-primary text-sm">{fileName}</p>
                  </>
                ) : (
                  <p className="text-lg font-bold text-primary">{fileName}</p>
                )}
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register("image", {
                required: "Image is required",
              })}
            />

            <p className="text-primary text-sm">{errors.image?.message}</p>
          </label>
        </div>
        <div className="flex flex-col w-full mb-3">
          <input
            type="text"
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 40,
                message: "The text length must be less than 40 characters.",
              },
            })}
          />
          <p className="text-primary text-sm">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col w-full mb-3">
          <input
            type="text"
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Description"
            {...register("summary", {
              required: "Summary is required",
            })}
          />
          <p className="text-primary text-sm">{errors.summary?.message}</p>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-3">
          <div className="flex flex-col">
            <input
              type="number"
              min={0}
              className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
              placeholder="Add Preparation Time"
              {...register("readyInMinutes", {
                required: "Preparation Time is required",
              })}
            />
            <p className="text-primary text-sm mt-1">
              {errors.readyInMinutes?.message}
            </p>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              min={0}
              className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
              placeholder="Add Servings"
              {...register("servings", {
                required: "Servings is required",
              })}
            />
            <p className="text-primary text-sm mt-1">
              {errors.servings?.message}
            </p>
          </div>
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
            {dishTypesOptions.map((type) => (
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
            placeholder="Add Ingredients (seperate each items with comma, ex: ingredients 1, ingredients 2, ingredients 3)"
            rows="5"
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
            placeholder="Add Instructions (seperate each items with comma, ex: instruction 1, instruction 2, instruction 3)"
            rows="5"
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

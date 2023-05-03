import React, { useEffect, useState } from "react";
import { MdImage } from "react-icons/md";
import { useForm } from "react-hook-form";
import Button from "../component/Button";
import Spinner from "../component/Spinner";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { dishTypesOptions, cuisineOptions } from "../formOptions";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  getMetadata,
} from "firebase/storage";

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

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: String!, $object: recipes_set_input!) {
    update_recipes_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      title
      # include any other fields you want to return after the update
    }
  }
`;

const EditRecipe = () => {
  const [percent, setPercent] = useState(0);
  const [fileURL, setfileURL] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { id },
  });
  const [updateRecipe] = useMutation(UPDATE_RECIPE);
  const storage = getStorage();
  const fileRef = ref(storage, fileURL);
  console.log(fileRef.name);

  const defaultValues = {
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      setfileURL(data?.recipes[0].image);
      setValue("title", data?.recipes[0].title);
      setValue("summary", data?.recipes[0].summary);
      setValue("ingredients", data?.recipes[0].extendedIngredients);
      setValue("instructions", data?.recipes[0].instructions);
      setValue("image", data?.recipes[0].image);
      setValue("readyInMinutes", data?.recipes[0].readyInMinutes);
      setValue("servings", data?.recipes[0].servings);
      setValue("dishTypes", data?.recipes[0].dishTypes);
      setValue("cuisines", data?.recipes[0].cuisines);
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(fileURL);
    console.log(data.image[0].name);
    console.log(fileURL !== data.image[0].name);
    const storageRef = ref(storage, `/files/${data.image[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, data.image[0]);
    setfileURL(data.image[0].name);
    console.log(fileURL);

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
          console.log(url);
          updateRecipe({
            variables: {
              id: id,
              object: {
                title: data.title,
                readyInMinutes: data.readyInMinutes,
                servings: data.servings,
                summary: data.summary,
                instructions: data.instructions,
                extendedIngredients: data.ingredients,
                dishTypes: data.dishTypes === "" ? null : data.dishTypes,
                cuisines: data.cuisines === "" ? null : data.cuisines,
                image: data.image[0].name === undefined ? fileURL : url,
              },
            },
          });
          navigate("/profile");
        });
      }
    );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">Edit Recipe</h1>
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
                {fileRef.name && (
                  <p className="text-lg font-bold text-primary">
                    {fileRef.name}
                  </p>
                )}
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
                  </>
                ) : (
                  <p className="text-lg font-bold text-primary">
                    {fileRef.name}
                  </p>
                )}
              </div>
            )}
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
          <p className="text-primary text-sm">{errors.description?.message}</p>
        </div>
        <div className="flex mb-3">
          <input
            type="number"
            className="me-5 border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Preparation Time"
            {...register("readyInMinutes", {
              required: "Preparation Time is required",
            })}
          />
          <p className="text-primary text-sm">
            {errors.readyInMinutes?.message}
          </p>
          <input
            type="number"
            className="border-2 border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Add Servings"
            {...register("servings", {
              required: "Servings is required",
            })}
          />
          <p className="text-primary text-sm">{errors.servings?.message}</p>
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

export default EditRecipe;

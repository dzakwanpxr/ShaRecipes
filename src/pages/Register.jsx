import Reac, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../component/Button";
import { gql, useMutation } from "@apollo/client";
import bcrypt from "bcryptjs";

const USER_REGISTER = gql`
  mutation UserRegister($object: user_insert_input!) {
    insert_user_one(object: $object) {
      id
      fullName
      email
    }
  }
`;

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const [userRegister, { loading, error, data }] = useMutation(USER_REGISTER);
  console.log(data);
  console.log(loading);
  console.log(error);

  const onSubmit = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    userRegister({
      variables: {
        object: {
          fullName: data.name,
          email: data.email,
          password: hashedPassword,
        },
      },
    });
    navigate("/login");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="p-10 min-h-screen flex flex-col justify-center ">
      <h1 className="text-3xl font-bold text-black text-center mb-5 md:text-6xl">
        Create an Account
      </h1>
      {error && (
        <p className="text-center text-primary font-bold mb-5">
          Email already exists
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col w-full max-w-lg md:max-w-2xl mb-3">
          <input
            type="text"
            className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Full Name"
            {...register("name", {
              required: "Full Name is required",
              maxLength: {
                value: 30,
                message: "Full name must be less than 30 characters.",
              },
            })}
          />
          <p className="text-primary text-sm">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col w-full max-w-lg md:max-w-2xl mb-3">
          <input
            className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Email Adress"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />
          <p className="text-primary text-sm">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col w-full max-w-lg md:max-w-2xl mb-3">
          <input
            type="password"
            className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          <p className="text-primary text-sm">{errors.password?.message}</p>
        </div>
        <div className="flex flex-col w-full max-w-lg md:max-w-2xl mb-3">
          <input
            type="password"
            className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Your Password doesn't match",
              validate: (value) => {
                return (
                  value === watch("password") || "Your Password doesn't match"
                );
              },
            })}
          />
          <p className="text-primary text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <Button
          className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-7 py-2.5 "
          label="Create Account"
        />
      </form>
      <p className="text-center mt-5">
        Alreay have an account?&nbsp;
        <Link to="/login" className="text-primary font-bold">
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default Register;

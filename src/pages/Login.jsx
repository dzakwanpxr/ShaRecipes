import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../component/Button";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="p-10 min-h-screen flex flex-col justify-center ">
      <div className="">
        <h1 className="text-3xl font-bold text-black text-center mb-5 md:text-6xl">
          Welcome back, chef!
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center text-center"
        >
          <input
            className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3 mb-3 max-w-lg md:max-w-2xl"
            placeholder="Username or Email"
            {...register("email")}
          />
          <input
            className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3 mb-3 max-w-lg md:max-w-2xl"
            placeholder="Password"
            {...register("password")}
          />
          <Button
            className="focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-7 py-2.5 "
            label="Sign In"
          />
        </form>
        <p className="text-center mt-5">
          Don’t have an account?&nbsp;
          <Link to="/register" className="text-primary font-bold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

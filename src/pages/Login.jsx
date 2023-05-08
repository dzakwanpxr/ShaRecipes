import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../component/Button";
import Spinner from "../component/Spinner";
import { gql, useLazyQuery } from "@apollo/client";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { AuthContext } from "../context/AuthContext";

const GET_USER = gql`
  query GetUser($email: String!) {
    user(where: { email: { _eq: $email } }) {
      id
      fullName
      password
    }
  }
`;

const Login = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [getUser, { data: userData, loading, error }] = useLazyQuery(GET_USER);
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    getUser({
      variables: {
        email: data.email,
      },
    });
  };

  useEffect(() => {
    if (userData?.user.length > 0) {
      const hashedPassword = userData.user[0]?.password;
      const plainPassword = getValues("password");

      const match = bcrypt.compareSync(plainPassword, hashedPassword);
      if (match) {
        const fullName = userData.user[0].fullName;
        const userID = userData.user[0].id;
        const token = nanoid();
        login(token, fullName, userID);
      }
    }
  }, [userData]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="p-10 min-h-screen flex flex-col justify-center ">
      <h1 className="text-3xl font-bold text-black text-center mb-5 md:text-6xl">
        Welcome back, chef!
      </h1>
      {userData?.user.length === 0 && (
        <p className="text-center text-primary font-bold mb-5">
          Invalid email or password
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center text-center"
      >
        <input
          className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3 mb-3 max-w-lg md:max-w-2xl"
          placeholder="Email"
          {...register("email")}
        />
        <input
          className="border border-black bg-white-50 text-gray-900 text-sm rounded-lg block w-full p-3 mb-3 max-w-lg md:max-w-2xl"
          placeholder="Password"
          type="password"
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
    </section>
  );
};

export default Login;

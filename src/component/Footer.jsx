import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.email !== "") {
      alert("Thank you for subscribing to our newsletter!");
    }
  };
  return (
    <footer className="grid grid-rows-2 items-center p-10 bg-footer md:px-20 md:py-10 md:grid-cols-2 md:grid-rows-1 ">
      <div className="md:grid md:grid-cols-1">
        <h1 className="text-white font-bold text-3xl mb-5 md:col-span-2">
          ShaRecipes
        </h1>

        <div className="md:flex md:flex-row md:gap-12 lg:gap-48">
          <div className="mb-3">
            <h4 className="text-white font-bold text-2xl">COMPANY</h4>
            <ul className="font-medium text-white">
              <li className="px-4 py-2 ">
                <a href="#" className=" hover:underline underline-offset-8">
                  About Us
                </a>
              </li>
              <li className="px-4 py-2">
                <a href="#" className=" hover:underline underline-offset-8">
                  Blog
                </a>
              </li>
              <li className="px-4 py-2">
                <a href="#" className=" hover:underline underline-offset-8">
                  F.A.Q
                </a>
              </li>
              <li className="px-4 py-2">
                <a href="#" className=" hover:underline underline-offset-8">
                  Partnership
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="text-white font-bold text-2xl">SOCIAL</h4>
            <ul className="font-medium text-white">
              <li className="px-4 py-2">
                <a href="#" className=" hover:underline underline-offset-8">
                  Facebook
                </a>
              </li>
              <li className="px-4 py-2">
                <a href="#" className=" hover:underline underline-offset-8">
                  Instagram
                </a>
              </li>
              <li className="px-4 py-2">
                <a href="#" className=" hover:underline underline-offset-8">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="">
        <h3 className="text-white font-bold text-xl mb-2">
          Subscribe to Our Newsletter!
        </h3>
        <p className="text-white mb-3">
          Do not miss the newest up-to-date recipes!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className=" bg-white-50  text-gray-900 text-sm rounded-lg block w-full p-5 mb-3 "
            placeholder="Your Email Adress"
            {...register("email", {
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid Email Address",
              },
            })}
          />
          <p className="text-primary">{errors.email?.message}</p>
          <Button
            className="text-white bg-primary hover:bg-red-800 font-medium rounded-lg text-sm w-full py-2.5 "
            label="Subscribe"
          />
        </form>
      </div>
    </footer>
  );
};

export default Footer;

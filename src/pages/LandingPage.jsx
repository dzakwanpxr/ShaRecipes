import React from "react";
import heroImg from "../assets/pana.png";
import globe from "../assets/globe.png";
import pot from "../assets/pot.png";
import document from "../assets/document.png";
import Button from "../component/Button";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/recipes");
  };

  return (
    <main>
      <section className="p-10 h-screen flex flex-col md:flex-row md:items-center md:justify-around">
        <div className="flex flex-col gap-5">
          <h1 className="text-center text-3xl font-bold max-w-xl leading-tight md:text-6xl md:leading-tight md:text-left">
            Improve Your Culinary Skills
          </h1>
          <p className="text-xl max-w-2xl md:text-2xl text-center md:text-left">
            ShaRecipes is a place where you can please your soul and tummy with
            delicious food recipes of all cuisines.
          </p>
          <Button
            className="w-full focus:outline-none text-white bg-primary hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-10 py-3 md:w-56"
            label="Let's Cook!"
            onClick={handleClick}
          />
        </div>
        <img src={heroImg} alt="hero-img" />
      </section>
      <section className="bg-primary p-20 font-bold ">
        <h1 className="text-white text-3xl text-center mb-20 md:text-6xl">
          Our Features
        </h1>
        <div className=" flex flex-col items-center gap-5 lg:flex-row justify-center lg:items-stretch lg:gap-20">
          <div className="w-72 bg-white rounded-lg flex flex-col items-center p-10 md:w-96">
            <img className="h-28" src={globe} alt="globe-img" />
            <h5 className=" mb-2 text-xl font-bold text-black text-center md:text-2xl">
              Recipe from all around the world
            </h5>
            <p className="  mb-3 text-l font-normal text-black text-center md:text-xl">
              We make sure to help everyone to try varieties of food from all
              around the world!
            </p>
          </div>
          <div className="w-72 bg-white rounded-lg flex flex-col items-center p-10 md:w-96">
            <img className="h-28" src={pot} alt="globe-img" />
            <h5 className=" mb-2 text-xl font-bold text-black text-center md:text-2xl">
              Easy to Recook
            </h5>
            <p className="  mb-3 text-l font-normal text-black text-center md:text-xl">
              With a very understandable instructions and also videos option to
              help you recook the food.
            </p>
          </div>
          <div className="w-72 bg-white rounded-lg flex flex-col items-center p-10 md:w-96">
            <img className="h-28" src={document} alt="globe-img" />
            <h5 className=" mb-2 text-xl font-bold text-black text-center md:text-2xl">
              Post your own recipe
            </h5>
            <p className="  mb-3 text-l font-normal text-black text-center md:text-xl">
              You can also make a post about your favorite recipe and share it
              with everybody!
            </p>
          </div>
        </div>
      </section>
      <section className="bg-food bg-no-repeat bg-cover bg-center opacity-80 ">
        <h1 className="text-3xl text-white font-bold text-center p-20 backdrop-brightness-50 md:text-6xl lg:p-72">
          More Than 2M+ Recipes From Around The World Are Here And You Can
          Access Them For Free
        </h1>
      </section>
    </main>
  );
};

export default LandingPage;

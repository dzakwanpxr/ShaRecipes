import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "./Button";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary border-gray-200 ">
      <div className="flex flex-wrap items-center justify-between mx-auto px-10 py-5">
        <Link to="/" className="text-white font-bold text-3xl">
          ShaRecipes
        </Link>
        <Button
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:ring-2 ring-white"
          onClick={toggleMenu}
          label={
            <>
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6 fill-white"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          }
        />
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0 md:items-center">
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive
                  ? "py-2 pl-3 pr-4 text-white underline underline-offset-8 md:p-0"
                  : "py-2 pl-3 pr-4 text-white hover:underline underline-offset-8 md:p-0"
              }
            >
              Recipes
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 pl-3 pr-4 text-white underline underline-offset-8 md:p-0"
                      : "py-2 pl-3 pr-4 text-white hover:underline underline-offset-8 md:p-0"
                  }
                >
                  Profile
                </NavLink>
                <Button
                  className="text-primary bg-white hover:bg-red-100 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-7 py-2.5"
                  onClick={logout}
                  label={"Logout"}
                />
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 pl-3 pr-4 text-white underline underline-offset-8 md:p-0"
                    : "py-2 pl-3 pr-4 text-white hover:underline underline-offset-8 md:p-0"
                }
              >
                Sign In
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

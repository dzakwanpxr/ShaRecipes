import React from "react";
import Layout from "./component/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import CardDetail from "./pages/CardDetail";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:id" element={<CardDetail />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="edit-recipe/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

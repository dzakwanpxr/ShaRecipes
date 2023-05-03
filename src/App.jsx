import React from "react";
import Layout from "./component/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import RecipeDetail from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:id" element={<RecipeDetail />} />
              <Route path="create" element={<CreateRecipe />} />
              <Route path="edit-recipe/:id" element={<EditRecipe />} />
              <Route element={<PrivateRoute />}>
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

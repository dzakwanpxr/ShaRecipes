import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const storedUserID = localStorage.getItem("userID");
    if (storedFullName && storedUserID) {
      setFullName(storedFullName);
      setUserID(storedUserID);
    }
  }, []);

  const login = (token, fullName, userID) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("userID", userID);
    setFullName(fullName);
    setUserID(userID);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    localStorage.removeItem("userID");
    setFullName("");
    setUserID("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ fullName, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

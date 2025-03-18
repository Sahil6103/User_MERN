import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Toaster } from "react-hot-toast";
import { Home } from "../components/Home";

export const AppRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

import React from "react";
import { AppRoute } from "./router/AppRoute";
import { Login } from "./components/Login";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <AppRoute />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

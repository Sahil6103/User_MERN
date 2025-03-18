import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";
import toast from "react-hot-toast";
import { showToast } from "../assets/js";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    !email
      ? showToast(e, emailRef, "Enter Email!")
      : !password
      ? showToast(e, passwordRef, "Enter Password!")
      : checkUser(e);
  };

  const checkUser = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center gap-10">
      <div className="heading">
        <h1 className="text-white text-4xl">Login</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-[#ffffff50] backdrop-blur-lg w-[30%] px-5 py-6 rounded-2xl">
        <input
          type="text"
          name="email"
          ref={emailRef}
          value={formData.email}
          onChange={handleInput}
          placeholder="Enter Email Address"
          className="border border-white rounded-lg px-5 py-4 placeholder:text-gray-300 text-white text-lg focus:outline-0 focus:border-black tracking-wide"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          value={formData.password}
          onChange={handleInput}
          placeholder="Enter Password"
          className="border border-white rounded-lg px-5 py-4 placeholder:text-gray-300 text-white text-lg focus:outline-0 focus:border-black tracking-wide"
        />
        <input
          type="submit"
          value="Login"
          className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-16 rounded-lg w-fit cursor-pointer transition-all duration-300"
        />
        <Link
          to="/register"
          className="text-emerald-500 hover:text-emerald-600 text-lg tracking-wide transition-all duration-300">
          Create New Account
        </Link>
      </form>
    </section>
  );
};

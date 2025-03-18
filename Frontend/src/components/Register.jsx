import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from "../assets/js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authServices";

export const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password } = formData;

    !fullname
      ? showToast(e, fullnameRef, "Enter Fullname!")
      : !email
      ? showToast(e, emailRef, "Enter Email Address!")
      : !password
      ? showToast(e, passwordRef, "Enter Password!")
      : saveUser(e);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center gap-10">
      <div className="heading">
        <h1 className="text-white text-4xl">Create New Account</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        // method="post"
        className="flex flex-col gap-5 bg-[#ffffff50] backdrop-blur-lg w-[30%] px-5 py-6 rounded-2xl">
        <input
          type="text"
          name="fullname"
          ref={fullnameRef}
          value={formData.fullname}
          onChange={handleInput}
          placeholder="Enter Fullname"
          className="border border-white rounded-lg px-5 py-4 placeholder:text-gray-300 text-white text-lg focus:outline-0 focus:border-black tracking-wide"
        />
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
          value="Create Account"
          className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-16 rounded-lg w-fit cursor-pointer transition-all duration-300"
        />
        <Link
          to="/"
          className="text-emerald-500 hover:text-emerald-600 text-lg tracking-wide transition-all duration-300">
          Go to Login Page
        </Link>
      </form>
    </section>
  );
};

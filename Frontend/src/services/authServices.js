import axios from "axios";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/register`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration Failed!");
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/login`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login Failed!");
  }
};

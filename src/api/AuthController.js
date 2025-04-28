import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const LoginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    return response.data; // return full data, including token
  } catch (error) {
    throw error;
  }
};

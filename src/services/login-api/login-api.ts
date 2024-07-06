import axios from "axios";
import { LoginFormData } from "../../types/login";
export const loginUser = async (data: LoginFormData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    data,
    config
  );
  return response;
};

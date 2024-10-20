// src/utils/queries/useLogin.ts
import apiService from "@services/apiService";
import { toast } from "react-toastify"

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  token?: string;
  message?: string;
  status?: string;
};

const LoginQuery = async (params: LoginParams): Promise<LoginResponse> => {
  try {
    // Use apiService to send a POST request
    const data = await apiService.post(
      `${import.meta.env.VITE_APP_API_AUTH_URL}/login`,
      params
    );

    // Return the response data (e.g., token, message)
    return data;
  } catch (error) {
    toast.error(
      error.message ||
        "Encountered server error, please contact customer service"
    );
  }
};

export default LoginQuery;

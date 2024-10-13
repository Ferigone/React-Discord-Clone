// src/utils/queries/useLogin.ts
import apiService from "@services/apiService";

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
    const data = await apiService.post(`${import.meta.env.VITE_APP_API_AUTH_URL}/login`, params);
    
    // Return the response data (e.g., token, message)
    return data;
  } catch (error) {
    // Handle error and pass the message for further action
    throw new Error("Login failed: " + error.message);
  }
};

export default LoginQuery;

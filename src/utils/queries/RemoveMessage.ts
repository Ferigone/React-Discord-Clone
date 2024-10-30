// src/utils/queries/useLogin.ts
import apiService from "@services/apiService";

const RemoveMesssage = async (messageId): Promise<any> => {
  try {
    // Use apiService to send a POST request
    const data = await apiService.delete(
      `${import.meta.env.VITE_APP_API_URL}/channel/message/${messageId}`
    );

    // Return the response data (e.g., token, message)
    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch servers: " + error.message);
  }
};

export default RemoveMesssage;

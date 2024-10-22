// src/utils/queries/CreateChannel.ts
import apiService from "@services/apiService";

type Params = {
  name: string;
  serverId: string;
};

const CreateChannel = async (params: Params): Promise<any> => {
  try {
    // Use apiService to make the POST request
    const data = await apiService.post(`${import.meta.env.VITE_APP_API_URL}/channels`, params);
    
    // Return the response from the server
    return data;
  } catch (error: any) {
    // Handle and throw error for the caller to manage
    throw new Error("Failed to create channel: " + error.message);
  }
};

export default CreateChannel;

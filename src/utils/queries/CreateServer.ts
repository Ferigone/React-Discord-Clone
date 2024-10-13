// src/utils/queries/CreateServer.ts
import apiService from "@services/apiService";

type Params = {
  name: string;
};

const CreateServer = async (params: Params): Promise<any> => {
  try {
    // Use the apiService to make the POST request
    const data = await apiService.post(`${import.meta.env.VITE_APP_API_URL}/servers`, params);
    
    // Return the server creation response
    return data;
  } catch (error) {
    // Handle error and throw it for the caller to manage
    throw new Error("Failed to create server: " + error.message);
  }
};

export default CreateServer;

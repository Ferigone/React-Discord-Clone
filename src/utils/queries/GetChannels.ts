// src/utils/queries/GetChannels.ts
import apiService from "@services/apiService";

const GetChannels = async (server_id: string | undefined): Promise<any> => {
  try {
    // Construct the API endpoint dynamically
    const url = `${import.meta.env.VITE_APP_API_URL}/channels?server=${server_id}`;

    // Use the apiService to make the GET request
    const data = await apiService.get(url);

    // Return the channels from the response
    return data.channels;
  } catch (error) {
    // Handle error and throw it for the caller to manage
    throw new Error("Failed to fetch channels: " + error.message);
  }
};

export default GetChannels;

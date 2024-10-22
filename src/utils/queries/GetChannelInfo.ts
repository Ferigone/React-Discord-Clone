// src/utils/queries/GetChannelInfo.ts
import apiService from "@services/apiService";

const GetChannelInfo = async (server_id: string): Promise<any> => {
  try {
    // Construct the API URL
    const url = `${import.meta.env.VITE_APP_API_URL}/channel/${server_id}`;

    // Use the apiService to make the GET request
    const data = await apiService.get(url);

    console.log()

    // Return the channel info from the response
    return data.channel;
  } catch (error: any) {
    // Handle error and throw it for the caller to manage
    throw new Error("Failed to fetch channel info: " + error.message);
  }
};

export default GetChannelInfo;

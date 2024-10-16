// src/utils/queries/GetAllServers.ts
import apiService from "@services/apiService";

const GetServers = async () => {
  try {
    const data = await apiService.get(`${import.meta.env.VITE_APP_API_URL}/servers`);
    return data?.servers || []; // Return the entire data object (or manipulate as needed)
  } catch (error) {
    throw new Error("Failed to fetch servers: " + error.message);
  }
};

export default GetServers;

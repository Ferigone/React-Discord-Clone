// src/utils/queries/GetServerById.ts
import apiService from "@services/apiService";

const GetServerById = async (server_id: string) => {
  try {
    const data = await apiService.get(`${import.meta.env.VITE_APP_API_URL}/server/${server_id}`);
    return data.server; // Return only the `server` object from the data
  } catch (error) {
    throw new Error("Failed to fetch server: " + error.message);
  }
};

export default GetServerById;

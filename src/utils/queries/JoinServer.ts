// src/utils/queries/GetServerById.ts
import apiService from "@services/apiService";

const GetServerById = async () => {
  try {
    const data = await apiService.post(`${import.meta.env.VITE_APP_API_URL}/server/join`, params);
    return data.server; // Return only the `server` object from the data
  } catch (error) {
    throw new Error("Failed to fetch server: " + error.message);
  }
};

export default GetServerById;

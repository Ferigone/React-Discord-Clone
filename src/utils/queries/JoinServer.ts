// src/utils/queries/GetServerById.ts
import apiService from "@services/apiService";

const JoinServer = async (params) => {
  try {
    const data = await apiService.post(`${import.meta.env.VITE_APP_API_URL}/server/join`, params);
    return data.server; // Return only the `server` object from the data
  } catch (error: any) {
    throw new Error("Failed to fetch server: " + error.message);
  }
};

export default JoinServer;

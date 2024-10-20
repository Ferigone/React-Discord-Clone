// src/services/apiService.ts

import { getCookie } from "@utils/cookies";
import { toast } from "react-toastify";

// Base API Service for handling common logic
const apiService = {
  get: async (url: string) => {
    const token = getCookie("token");

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  post: async (url: string, body: any) => {
    const token = getCookie("token");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  },

  // Extend for other methods like PUT, DELETE if needed
};

export default apiService;

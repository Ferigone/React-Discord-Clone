// src/utils/queries/SendMessage.ts
import apiService from "@services/apiService";

const SendMessage = async (message: string, channelId: string): Promise<any> => {
  try {
    // Use apiService to send a POST request
    const data = await apiService.post(`${import.meta.env.VITE_APP_API_URL}/channel/message`, {
      message,
      channel_id: channelId,
    });

    // Return the response data
    return data;
  } catch (error: any) {
    // Handle and throw the error to be managed by the caller
    throw new Error("Failed to send message: " + error.message);
  }
};

export default SendMessage;

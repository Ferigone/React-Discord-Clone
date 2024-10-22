// src/utils/queries/GetMessages.ts
import apiService from "@services/apiService";

const GetMessages = async (channel_id: string | undefined, message_index: number): Promise<any> => {
  try {
    const url = `${import.meta.env.VITE_APP_API_URL}/channel/${channel_id}/messages?limit=50${message_index > 0 ? `&before=${message_index}` : ""}`;
    
    // Use the apiService to make the GET request
    const data = await apiService.get(url);
    
    // Return the messages from the API response
    return data.messages;
  } catch (error: any) {
    // Throw the error to be handled by the caller
    throw new Error("Failed to fetch messages: " + error.message);
  }
};

export default GetMessages;

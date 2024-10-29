import apiService from "@services/apiService";

const ChangeUserAvatar = async (fileUrl): Promise<any> => {
  try {
    // Use apiService to make the POST request
    const data = await apiService.post(
      `${import.meta.env.VITE_APP_API_URL}/user/avatar`,
      {
        fileUrl
      }
    );

    // Return the response from the server
    return data;
  } catch (error: any) {
    // Handle and throw error for the caller to manage
    throw new Error("Failed to change user avatar: " + error.message);
  }
};

export default ChangeUserAvatar;

import apiService from "@services/apiService";

const UploadUserFile = async (file: any): Promise<any> => {
  try {
    // Use apiService to send a POST request
    const data = await apiService.upload(`${import.meta.env.VITE_APP_CDN_URL}/user`, file);

    // Return the response data
    return data;
  } catch (error: any) {
    // Handle and throw the error to be managed by the caller
    throw new Error("Failed to upload user file: " + error.message);
  }
};

export default UploadUserFile;
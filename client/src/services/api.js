import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const analyzeRepository = async (repoUrl) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/analyze`,
      {
        repoUrl,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to generate README"
    );
  }
};

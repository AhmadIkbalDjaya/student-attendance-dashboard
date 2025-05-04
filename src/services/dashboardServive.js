import handleApiError from "../helpers/handleApiError";
import apiClient from "../config/api";

export const getDashboardData = async () => {
  try {
    const response = await apiClient.get("/admin/home");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

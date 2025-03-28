import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getDashboardData = async () => {
  try {
    const response = await apiClient.get("/admin/home");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

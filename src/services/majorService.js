import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getAllMajors = async () => {
  try {
    const response = await apiClient.get("admin/major");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

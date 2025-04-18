import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
export const getAllRecaps = async (page, perpage, search) => {
  try {
    const response = await apiClient.get("/admin/recap", {
      params: { page, perpage, search },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCourseRecap = async (id) => {
  try {
    const response = await apiClient.get(`/recap/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

const API_PREFIX = "/admin/courses";

export const getCourseRecap = async (courseId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${courseId}/recap`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

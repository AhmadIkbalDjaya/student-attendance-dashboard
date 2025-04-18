import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getAllCourses = async (page, perpage, search) => {
  try {
    const response = await apiClient.get("admin/course", {
      params: { page, perpage, search },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCourse = async (id) => {
  try {
    const response = await apiClient.get(`/admin/course/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createCourse = async (data) => {
  try {
    const response = await apiClient.post("/admin/course", data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateCourse = async (id, data) => {
  try {
    const response = await apiClient.post(
      `/admin/course/${id}?_method=PUT`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/course/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

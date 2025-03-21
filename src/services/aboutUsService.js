import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getAllAboutUs = async () => {
  try {
    const response = await apiClient.get("/admin/aboutUs");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAboutUs = async (id) => {
  try {
    const response = await apiClient.get(`/admin/aboutUs/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createAboutUs = async (data) => {
  try {
    const response = await apiClient.post("/admin/aboutUs", data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateAboutUs = async (id, data) => {
  try {
    const response = await apiClient.post(
      `/admin/aboutUs/${id}?_method=PUT`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

export const deleteAboutUs = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/aboutUs/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

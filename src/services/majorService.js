import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getAllMajors = async (page, perpage, search) => {
  try {
    const response = await apiClient.get("admin/major", {
      params: { page, perpage, search },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMajor = async (id) => {
  try {
    const response = await apiClient.get(`/admin/major/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createMajor = async (data) => {
  try {
    const response = await apiClient.post("/admin/major", data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateMajor = async (id, data) => {
  try {
    const response = await apiClient.post(
      `/admin/major/${id}?_method=PUT`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

export const deleteMajor = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/major/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Delete failed");
  }
};
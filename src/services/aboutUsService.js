import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

const API_PREFIX = "/admin/about-us";

export const getAllAboutUs = async (page, perpage, search) => {
  try {
    const response = await apiClient.get(API_PREFIX, {
      params: { page, perpage, search },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAboutUs = async (id) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createAboutUs = async (data) => {
  try {
    const response = await apiClient.post(API_PREFIX, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateAboutUs = async (id, data) => {
  try {
    const response = await apiClient.post(
      `${API_PREFIX}/${id}?_method=PUT`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

export const deleteAboutUs = async (id) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

export const getAboutUsIdsList = async () => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/ids`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteAboutUs = async (ids) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk`, {
      data: { ids },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

const API_PREFIX = "/admin/major";

export const getAllMajors = async (page, perpage, search) => {
  try {
    const response = await apiClient.get(API_PREFIX, {
      params: { page, perpage, search },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMajor = async (id) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createMajor = async (data) => {
  try {
    const response = await apiClient.post(API_PREFIX, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateMajor = async (id, data) => {
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

export const deleteMajor = async (id) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Delete failed");
  }
};

export const getMajorIdsList = async () => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/list/ids`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteMajors = async (ids) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk`, {
      data: { ids },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Delete failed");
  }
};

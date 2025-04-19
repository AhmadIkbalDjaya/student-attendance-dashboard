import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

const API_PREFIX = "/admin/claass";

export const getAllClaasses = async (page, perpage, search) => {
  try {
    const response = await apiClient.get(API_PREFIX, {
      params: { page, perpage, search },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getClaass = async (id) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createClaass = async (data) => {
  try {
    const response = await apiClient.post(API_PREFIX, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateClaass = async (id, data) => {
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

export const deleteClaass = async (id) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

export const getClaassIdsList = async () => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/list/ids`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteClaass = async (ids) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk`, {
      data: { ids },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

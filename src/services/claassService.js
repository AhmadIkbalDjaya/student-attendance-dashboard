import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getAllClaasses = async () => {
  try {
    const response = await apiClient.get("/admin/claass");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getClaass = async (id) => {
  try {
    const response = await apiClient.get(`/admin/claass/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createClaass = async (data) => {
  try {
    const response = await apiClient.post("/admin/claass", data);
    return response.data;
  } catch (error) {
    console.log(error);
    
    return handleApiError(error, "Create failed");
  }
};

export const updateClaass = async (id, data) => {
  try {
    const response = await apiClient.post(
      `/admin/claass/${id}?_method=PUT`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

export const deleteClaass = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/claass/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

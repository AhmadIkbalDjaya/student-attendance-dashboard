import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getAllStudents = async () => {
  try {
    const response = await apiClient.get("admin/student");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStudent = async (id) => {
  try {
    const response = await apiClient.get(`/admin/student/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createStudent = async (data) => {
  try {
    const response = await apiClient.post("/admin/student", data);
    return response.data;
  } catch (error) {
    console.log(error);

    return handleApiError(error, "Create failed");
  }
};

export const updateStudent = async (id, data) => {
  try {
    const response = await apiClient.post(
      `/admin/student/${id}?_method=PUT`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/student/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

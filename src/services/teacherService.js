import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const getAllTeachers = async (page, perpage, search) => {
  try {
    const response = await apiClient.get("admin/teacher", {
      params: { page, perpage, search },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTeacher = async (id) => {
  try {
    const response = await apiClient.get(`/admin/teacher/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createTeacher = async (data) => {
  try {
    const response = await apiClient.post("/admin/teacher", data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateTeacher = async (id, data) => {
  try {
    const response = await apiClient.post(
      `/admin/teacher/${id}?_method=PUT`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

export const deleteTeacher = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/teacher/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

export const setTeacherPassword = async (id, data) => {
  try {
    const response = await apiClient.post(`/admin/teacher/setPass/${id}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

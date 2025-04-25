import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

const API_PREFIX = "/admin/student";

export const getAllStudents = async (
  page,
  perpage,
  search,
  claassId,
  courseId
) => {
  try {
    const response = await apiClient.get(API_PREFIX, {
      params: {
        page,
        perpage,
        search,
        claass_id: claassId,
        course_id: courseId,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStudent = async (id) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createStudent = async (data) => {
  try {
    const response = await apiClient.post(API_PREFIX, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateStudent = async (id, data) => {
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

export const deleteStudent = async (id) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

export const getStudentIdsList = async (claassId, courseId) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/list/ids`, {
      params: { claass_id: claassId, course_id: courseId },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteStudent = async (ids) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk`, {
      data: { ids },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

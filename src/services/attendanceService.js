import handleApiError from "../helpers/handleApiError";
import apiClient from "../config/api";

const API_PREFIX = "/admin/attendance";

export const getAttendances = async (page, perpage, search, date) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}`, {
      params: {
        page,
        perpage,
        search,
        date,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAttendance = async (id) => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteAttendance = async (id) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

export const getAttendanceIdsList = async () => {
  try {
    const response = await apiClient.get(`${API_PREFIX}/list/ids`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const bulkDeleteAttendance = async (ids) => {
  try {
    const response = await apiClient.delete(`${API_PREFIX}/bulk`, {
      data: { ids },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

export const getAttendanceStatuses = async () => {
  try {
    const response = await apiClient.get("attendance-status");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

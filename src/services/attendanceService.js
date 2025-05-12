import dayjs from "dayjs";

import handleApiError from "../helpers/handleApiError";
import apiClient from "../config/api";

const API_PREFIX = "/admin/attendances";

export const getAllAttendances = async (page, perpage, search, date) => {
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

export const createAttendance = async (data) => {
  try {
    const { title, datetime, course_id } = data;
    const response = await apiClient.post(`${API_PREFIX}`, {
      title,
      datetime: dayjs(datetime).format("YYYY-MM-DD HH:mm:ss") ?? null,
      course_id,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Create failed");
  }
};

export const updateAttendance = async (id, data) => {
  try {
    const { title, datetime, course_id } = data;
    const response = await apiClient.post(`${API_PREFIX}/${id}?_method=PUT`, {
      title,
      datetime: dayjs(datetime).format("YYYY-MM-DD HH:mm:ss") ?? null,
      course_id,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
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
    const response = await apiClient.get(`${API_PREFIX}/ids`);
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

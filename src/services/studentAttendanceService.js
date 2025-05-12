import handleApiError from "../helpers/handleApiError";
import apiClient from "../config/api";

const API_PREFIX = "/admin/attendances";

export const getStudentAttendance = async (attendanceId) => {
  try {
    const response = await apiClient.get(
      `${API_PREFIX}/${attendanceId}/student-attendances`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateStudentAttendance = async (attendanceId, data) => {
  try {
    const response = await apiClient.post(
      `${API_PREFIX}/${attendanceId}/student-attendances`,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Update failed");
  }
};

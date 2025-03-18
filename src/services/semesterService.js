import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";
export const getAllSemester = async () => {
  try {
    const response = await apiClient.get("/admin/semester");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteSemester = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/semester/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Deleted failed");
  }
};

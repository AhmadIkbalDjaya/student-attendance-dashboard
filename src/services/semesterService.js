import apiClient from "../config/api";
export const getAllSemester = async () => {
  try {
    const response = await apiClient.get("/admin/semesterr");
    return response.data;
  } catch (error) {
    let errorMessage = "Failed Get Data";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
};

export const deleteSemester = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/semester/${id}`);
    return response.data;
  } catch (error) {
    let errorMessage = "Failed to delete semester";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    throw new Error(errorMessage);
  }
};

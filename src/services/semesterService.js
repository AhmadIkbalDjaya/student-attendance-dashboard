import apiClient from "../config/api";
export const getAllSemester = async () => {
  try {
    const response = await apiClient.get("/admin/semester");
    return response.data;
  } catch (error) {
    console.log("Error Fetching Data:", error);
    throw error;
  }
};

export const deleteSemester = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/semester/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error Fetching Data:", error);
    throw error; 
  }
};

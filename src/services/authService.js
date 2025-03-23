import apiClient from "../config/api";
import handleApiError from "../helpers/handleApiError";

export const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    if (response.data.data.role == "admin") {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    } else {
      throw new Error("Login failed");
    }
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.get("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return response.data;
  } catch (error) {
    return handleApiError(error, "Logout failed");
  }
};

export const changeAuthPassword = async (data) => {
  try {
    const response = await apiClient.post("/user/changePass", data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user;
};

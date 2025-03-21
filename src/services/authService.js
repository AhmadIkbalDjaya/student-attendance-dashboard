const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const changeAuthPassword = async (data) => {
  try {
    const response = await apiClient.post("/user/changePass", data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

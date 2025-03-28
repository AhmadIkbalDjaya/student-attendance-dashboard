import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { isAuthenticated, login } from "../../../services/authService";
import { showMessage } from "../../../utils/messageUtils";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (form) => {
    console.log(form);
    try {
      setLoadingSubmit(true);
      await login(form.getFieldValue());
      showMessage({ type: "success", content: "Login successfully" });
      navigate("/");
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const checkAuthentication = () => {
    if (isAuthenticated()) {
      navigate("/");
      showMessage({ type: "success", content: "You are logged in" });
    }
  };

  return {
    loadingSubmit,
    handleSubmit,
    checkAuthentication,
  };
};

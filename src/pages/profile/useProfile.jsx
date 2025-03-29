import { Link } from "react-router-dom";
import { useState } from "react";

import { changeAuthPassword } from "../../services/authService";
import { showMessage } from "../../utils/messageUtils";

export const useProfile = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmitForm = async (form) => {
    try {
      setLoadingSubmit(true);
      await changeAuthPassword(form.getFieldValue());
      form.resetFields();
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const descriptionItems = [
    {
      key: "username",
      label: "Username",
      children: user?.username,
      span: { xs: 2, sm: 1 },
    },
    {
      key: "email",
      label: "Email",
      children: user?.email,
      span: { xs: 2, sm: 1 },
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Profile",
    },
  ];

  return {
    breadcrumbItems,
    descriptionItems,
    handleSubmitForm,
    loadingSubmit,
  };
};

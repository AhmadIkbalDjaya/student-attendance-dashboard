import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAboutUs } from "../../../services/aboutUsService";
import { showMessage } from "../../../utils/messageUtils";

export const useCreate = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await createAboutUs(form.getFieldValue());
      navigate("/about-us");
      showMessage({ type: "success", content: "Created successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/about-us">About Us</Link>,
    },
    {
      title: "Create About Us",
    },
  ];

  return {
    breadcrumbItems,
    handleSubmit,
    submitLoading,
  };
};

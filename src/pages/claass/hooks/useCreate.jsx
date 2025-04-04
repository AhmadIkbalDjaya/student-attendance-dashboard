import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createClaass } from "../../../services/claassService";
import { setFormErrors } from "../../../helpers/setFormErrors";
import { showMessage } from "../../../utils/messageUtils";

export const useCreate = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await createClaass(form.getFieldValue());
      navigate("/claass");
      showMessage({ type: "success", content: "Created successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
      setFormErrors(form, error);
    } finally {
      setSubmitLoading(false);
    }
  };
  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/claass">Class</Link>,
    },
    {
      title: "Create Class",
    },
  ];

  return {
    breadcrumbItems,
    submitLoading,
    handleSubmit,
  };
};

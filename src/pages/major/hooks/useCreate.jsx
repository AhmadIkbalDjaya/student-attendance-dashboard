import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createMajor } from "../../../services/majorService";
import { setFormErrors } from "../../../helpers/setFormErrors";
import { showMessage } from "../../../utils/messageUtils";

export const useCreate = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await createMajor(form.getFieldValue());
      navigate("/major");
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
      title: <Link to="/major">Major</Link>,
    },
    {
      title: "Create Major",
    },
  ];

  return {
    breadcrumbItems,
    handleSubmit,
    submitLoading,
  };
};

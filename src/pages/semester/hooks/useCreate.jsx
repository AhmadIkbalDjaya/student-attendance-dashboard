import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createSemester } from "../../../services/semesterService";
import { setFormErrors } from "../../../helpers/setFormErrors";
import { showMessage } from "../../../utils/messageUtils";

export const useCreate = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await createSemester(form.getFieldValue());
      navigate("/semester");
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
      title: <Link to="/semester">Semester</Link>,
    },
    {
      title: "Create Semester",
    },
  ];

  return {
    breadcrumbItems,
    submitLoading,
    handleSubmit,
  };
};

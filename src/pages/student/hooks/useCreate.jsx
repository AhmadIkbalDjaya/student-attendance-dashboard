import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createStudent } from "../../../services/studentService";
import { showMessage } from "../../../utils/messageUtils";

export const useCreate = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await createStudent(form.getFieldValue());
      navigate("/student");
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
      title: <Link to="/student">Student</Link>,
    },
    {
      title: "Create Student",
    },
  ];
  
  return {
    breadcrumbItems,
    handleSubmit,
    submitLoading,
  };
};

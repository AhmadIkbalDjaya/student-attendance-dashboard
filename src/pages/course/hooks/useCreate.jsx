import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCourse } from "../../../services/courseService";
import { showMessage } from "../../../utils/messageUtils";

export const useCreate = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await createCourse(form.getFieldValue());
      navigate("/course");
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
      title: <Link to="/course">Course</Link>,
    },
    {
      title: "Create Course",
    },
  ];

  return {
    breadcrumbItems,
    handleSubmit,
    submitLoading,
  }
}

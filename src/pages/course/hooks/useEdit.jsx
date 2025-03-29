import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { getCourse, updateCourse } from "../../../services/courseService";
import { showMessage } from "../../../utils/messageUtils";

export const useEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await updateCourse(id, form.getFieldValue());
      navigate("/course");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  const fetchCourse = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getCourse(id);
      form.setFieldsValue(result.data);
      setFetchLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
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
      title: "Edit Course",
    },
  ];

  return {
    breadcrumbItems,
    fetchCourse,
    fetchLoading,
    handleSubmit,
    submitLoading,
  };
};

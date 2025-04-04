import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { getTeacher, updateTeacher } from "../../../services/teacherService";
import { showMessage } from "../../../utils/messageUtils";
import { setFormErrors } from "../../../helpers/setFormErrors";

export const useEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await updateTeacher(id, form.getFieldValue());
      navigate("/teacher");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
      setFormErrors(form, error);
    } finally {
      setSubmitLoading(false);
    }
  };
  const fetchTeacher = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getTeacher(id);
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
      title: <Link to="/teacher">Teacher</Link>,
    },
    {
      title: "Edit Teacher",
    },
  ];

  return {
    breadcrumbItems,
    fetchTeacher,
    fetchLoading,
    handleSubmit,
    submitLoading,
  };
};

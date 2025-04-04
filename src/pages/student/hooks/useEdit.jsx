import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { getStudent, updateStudent } from "../../../services/studentService";
import { setFormErrors } from "../../../helpers/setFormErrors";
import { showMessage } from "../../../utils/messageUtils";

export const useEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await updateStudent(id, form.getFieldValue());
      navigate("/student");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
      setFormErrors(form, error);
    } finally {
      setSubmitLoading(false);
    }
  };
  const fetchStudent = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getStudent(id);
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
      title: <Link to="/student">Student</Link>,
    },
    {
      title: "Edit Student",
    },
  ];

  return {
    breadcrumbItems,
    fetchStudent,
    fetchLoading,
    handleSubmit,
    submitLoading,
  };
};

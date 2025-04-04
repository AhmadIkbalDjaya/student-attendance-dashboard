import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { getSemester, updateSemester } from "../../../services/semesterService";
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
      await updateSemester(id, form.getFieldValue());
      navigate("/semester");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
      setFormErrors(form, error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchSemester = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getSemester(id);
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
      title: <Link to="/semester">Semester</Link>,
    },
    {
      title: "Edit Semester",
    },
  ];

  return {
    breadcrumbItems,
    fetchSemester,
    fetchLoading,
    handleSubmit,
    submitLoading,
  };
};

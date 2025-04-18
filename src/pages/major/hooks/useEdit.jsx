import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { getMajor, updateMajor } from "../../../services/majorService";
import { setFormErrors } from "../../../helpers/setFormErrors";
import { showMessage } from "../../../utils/messageUtils";

export const useEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await updateMajor(id, form.getFieldValue());
      navigate("/major");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
      setFormErrors(form, error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchData = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getMajor(id);
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
      title: <Link to="/major">Major</Link>,
    },
    {
      title: "Edit Major",
    },
  ];

  return {
    breadcrumbItems,
    fetchData,
    fetchLoading,
    handleSubmit,
    submitLoading,
  };
};

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { getClaass, updateClaass } from "../../../services/claassService";
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
      await updateClaass(id, form.getFieldValue());
      navigate("/claass");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
      setFormErrors(form, error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchClaass = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getClaass(id);
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
      title: <Link to="/claass">Class</Link>,
    },
    {
      title: "Edit Class",
    },
  ];

  return {
    fetchClaass,
    fetchLoading,
    breadcrumbItems,
    handleSubmit,
    submitLoading,
  };
};

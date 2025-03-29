import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { getAboutUs, updateAboutUs } from "../../../services/aboutUsService";
import { showMessage } from "../../../utils/messageUtils";

export const useEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await updateAboutUs(id, form.getFieldValue());
      navigate("/about-us");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchData = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getAboutUs(id);
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
      title: <Link to="/about-us">About Us</Link>,
    },
    {
      title: "Edit About Us",
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

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createAttendance } from "../../../services/attendanceService";
import { setFormErrors } from "../../../helpers/setFormErrors";
import { showMessage } from "../../../utils/messageUtils";

export const useCreate = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (form) => {
    try {
      setSubmitLoading(true);
      await createAttendance(form.getFieldValue());
      navigate(-1);
      showMessage({
        type: "success",
        content: "Create attendance successfully",
      });
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
      title: <Link to="/attendance">Attendance</Link>,
    },
    {
      title: "Create attendance",
    },
  ];

  return {
    breadcrumbItems,
    handleSubmit,
    submitLoading,
  };
};

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

import {
  getAttendance,
  updateAttendance,
} from "../../../services/attendanceService";
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
      await updateAttendance(id, form.getFieldValue());
      navigate(-1);
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
      setFormErrors(form, error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchAttendance = async (form) => {
    try {
      setFetchLoading(true);
      const result = await getAttendance(id);
      const { title, course_id, datetime } = result.data;
      form.setFieldsValue({
        title,
        course_id,
        datetime: datetime ? dayjs(datetime) : null,
      });
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
      title: <Link to="/attendance">Attendance</Link>,
    },
    {
      title: "Edit Attendance",
    },
  ];

  return {
    breadcrumbItems,
    fetchAttendance,
    fetchLoading,
    handleSubmit,
    submitLoading,
  };
};

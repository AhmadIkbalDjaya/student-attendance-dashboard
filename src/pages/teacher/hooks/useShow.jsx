import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "antd";

import { deleteTeacher, getTeacher, setTeacherPassword } from "../../../services/teacherService";
import { setFormErrors } from "../../../helpers/setFormErrors";
import { showMessage } from "../../../utils/messageUtils";

export const useShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const fetchTeacher = async () => {
    try {
      setFetchLoading(true);
      const result = await getTeacher(id);
      setTeacher(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      navigate("/teacher");
      showMessage({ type: "success", content: "Deleted successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const handleClickDelete = () => {
    Modal.confirm({
      title: "Are you sure delete this data?",
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: () => handleDelete(id),
    });
  };

  const handleSubmitForm = async (form) => {
    try {
      setSubmitLoading(true);
      await setTeacherPassword(id, form.getFieldValue());
      showMessage({ type: "success", content: "Updated successfully" });
      form.setFieldValue("password", "");
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
      title: <Link to="/teacher">Teacher</Link>,
    },
    {
      title: "Detail Teacher",
    },
  ];

  const descriptionItems = [
    {
      key: "name",
      label: "Course Name",
      children: teacher?.name,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "username",
      label: "Username",
      children: teacher?.username,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "email",
      label: "Email",
      children: teacher?.email,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "phone",
      label: "Phone",
      children: teacher?.phone ?? "-",
      span: { xs: 1, sm: 1 },
    },
    {
      key: "gender",
      label: "Gender",
      children: teacher?.gender,
      span: { xs: 1, sm: 1 },
    },
  ];

  return {
    breadcrumbItems,
    fetchTeacher,
    fetchLoading,
    handleClickDelete,
    teacher,
    handleSubmitForm,
    submitLoading,
    descriptionItems,
  };
};

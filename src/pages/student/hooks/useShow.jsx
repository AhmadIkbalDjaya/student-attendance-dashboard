import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { deleteStudent, getStudent } from "../../../services/studentService";
import { showMessage } from "../../../utils/messageUtils";
import { Modal } from "antd";

export const useShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const fetchStudent = async () => {
    try {
      setFetchLoading(true);
      const result = await getStudent(id);
      setStudent(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      navigate("/student");
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

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/student">Student</Link>,
    },
    {
      title: "Detail Student",
    },
  ];

  const descriptionItems = [
    {
      key: "name",
      label: "Name",
      children: student?.name,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "nis",
      label: "NIS",
      children: student?.nis,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "claass",
      label: "Class",
      children: student?.claass_name,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "gender",
      label: "Gender",
      children: student?.gender,
      span: { xs: 1, sm: 1 },
    },
  ];

  return {
    breadcrumbItems,
    fetchStudent,
    student,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
  };
};

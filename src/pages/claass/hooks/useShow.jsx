import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "antd";

import { deleteClaass, getClaass } from "../../../services/claassService";
import { showMessage } from "../../../utils/messageUtils";

export const useShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claass, setClaass] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [showRelation, setShowRelation] = useState("students");

  const fetchClaass = async () => {
    try {
      setFetchLoading(true);
      const result = await getClaass(id);
      setClaass(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClaass(id);
      navigate("/claass");
      showMessage({ type: "success", content: "Delete class successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const handleClickDelete = () => {
    Modal.confirm({
      title: "Are you sure delete this class?",
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOK: () => handleDelete(id),
    });
  };

  const descriptionItems = [
    {
      key: "name",
      label: "Class Name",
      children: claass?.name,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "level",
      label: "Level",
      children: claass?.level,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "major",
      label: "Major",
      children: claass?.major,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "students_count",
      label: "Total Students",
      children: claass?.students_count,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "courses_count",
      label: "Total Courses",
      children: claass?.courses_count,
      span: { xs: 1, sm: 1 },
    },
  ];

  const descriptionItemsTimestamp = [
    {
      key: "created_at",
      label: "Created at",
      children: claass?.created_at,
      span: { xs: 1, md: 2 },
    },
    {
      key: "updated_at",
      label: "Updated at",
      children: claass?.updated_at,
      span: { xs: 1, md: 2 },
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/claass">Class</Link>,
    },
    {
      title: "Detail Claass",
    },
  ];

  return {
    breadcrumbItems,
    fetchClaass,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
    descriptionItemsTimestamp,
    showRelation,
    setShowRelation,
  };
};

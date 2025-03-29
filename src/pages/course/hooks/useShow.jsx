import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCourse, getCourse } from "../../../services/courseService";
import { showMessage } from "../../../utils/messageUtils";
import { Modal } from "antd";

export const useShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const fetchStudent = async () => {
    try {
      setFetchLoading(true);
      const result = await getCourse(id);
      setCourse(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      navigate("/course");
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
      title: <Link to="/course">Course</Link>,
    },
    {
      title: "Detail Course",
    },
  ];

  return {
    breadcrumbItems,
    fetchStudent,
    course,
    fetchLoading,
    handleClickDelete,
  };
};

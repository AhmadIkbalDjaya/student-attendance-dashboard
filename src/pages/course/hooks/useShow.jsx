import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "antd";

import { deleteCourse, getCourse } from "../../../services/courseService";
import { showMessage } from "../../../utils/messageUtils";

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

  const descriptionItems = [
    {
      key: "name",
      label: "Course Name",
      children: course?.name,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "claass",
      label: "Class Name",
      children: course?.claass,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "teacher",
      label: "Teacher",
      children: course?.teacher,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "semester",
      label: "Semester",
      children: course?.semester,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "stduent_count",
      label: "Total Student",
      children: course?.student_count,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "total_attendance",
      label: "Total Attendance",
      children: course?.attendance_count,
      span: { xs: 1, sm: 1 },
    },
  ];

  const descriptionItemsTimestamp = [
    {
      key: "created_at",
      label: "Created at",
      children: course?.created_at,
      span: { xs: 1, md: 2 },
    },
    {
      key: "updated_at",
      label: "Updated at",
      children: course?.updated_at,
      span: { xs: 1, md: 2 },
    },
  ];

  return {
    breadcrumbItems,
    fetchStudent,
    course,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
    descriptionItemsTimestamp,
  };
};

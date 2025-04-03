import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { getCourseRecap } from "../../../services/recapService";
import { showMessage } from "../../../utils/messageUtils";

export const useShow = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [recaps, setRecaps] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const fetchRecap = async () => {
    try {
      setFetchLoading(true);
      const result = await getCourseRecap(id);
      setRecaps(result.data.students_recap);
      setCourse(result.data.course);
      setFetchLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NIS",
      dataIndex: "nis",
      key: "nis",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "H",
      dataIndex: "h_count",
      key: "h_count",
    },
    {
      title: "S",
      dataIndex: "s_count",
      key: "s_count",
    },
    {
      title: "I",
      dataIndex: "i_count",
      key: "i_count",
    },
    {
      title: "A",
      dataIndex: "a_count",
      key: "a_count",
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/recap">Recap</Link>,
    },
    {
      title: "Detail Recap",
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

  return {
    breadcrumbItems,
    course,
    recaps,
    fetchLoading,
    fetchRecap,
    columns,
    descriptionItems,
  };
};

import {
  IconBrandDatabricks,
  IconChalkboard,
  IconUserPentagon,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";

import { getDashboardData } from "../../../services/dashboardServive";
import { showMessage } from "../../../utils/messageUtils";

export const useDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState();
  const [loadingFetch, setLoadingFetch] = useState(false);

  const fetchData = async () => {
    try {
      setLoadingFetch(true);
      const result = await getDashboardData();
      setData(result.data);
      setLoadingFetch(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const statisticsData = [
    {
      title: "Total Students",
      value: data?.student_count,
      icon: <IconUsers size={34} />,
      color: "#4096ff",
    },
    {
      title: "Total Teachers",
      value: data?.teacher_count,
      icon: <IconUserPentagon size={34} />,
      color: "#fadb14",
    },
    {
      title: "Total Classes",
      value: data?.claass_count,
      icon: <IconChalkboard size={34} />,
      color: "#a0d911",
    },
    {
      title: "Total Courses",
      value: data?.course_count,
      icon: <IconBrandDatabricks size={34} />,
      color: "#f5222d",
    },
  ];

  return { user, statisticsData, fetchData, loadingFetch };
};

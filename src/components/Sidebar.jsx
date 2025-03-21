import useSidebarStore from "../store/sidebarStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  IconBooks,
  IconBrandDatabricks,
  IconChalkboard,
  IconChartInfographic,
  IconHome,
  IconUserPentagon,
  IconUsers,
} from "@tabler/icons-react";

export default function Sidebar() {
  const collapse = useSidebarStore((state) => state.collapse);
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "1",
      label: "Dashboard",
      icon: <IconHome style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/"),
    },
    {
      key: "semester",
      label: "Semester",
      icon: <IconBooks style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/semester"),
    },
    {
      key: "claass",
      label: "Class",
      icon: <IconChalkboard style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/claass"),
    },
    {
      key: "teacher",
      label: "Teacher",
      icon: <IconUserPentagon style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/teacher"),
    },
    {
      key: "student",
      label: "Student",
      icon: <IconUsers style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/student"),
    },
    {
      key: "course",
      label: "Course",
      icon: <IconBrandDatabricks style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/course"),
    },
    {
      key: "recap",
      label: "Recap",
      icon: <IconChartInfographic style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/recap"),
    },
  ];

  let selectedKey = [];
  if (location.pathname == "/") {
    selectedKey = ["1"];
  } else if (location.pathname.startsWith("/semester")) {
    selectedKey = ["semester"];
  } else if (location.pathname.startsWith("/claass")) {
    selectedKey = ["claass"];
  } else if (location.pathname.startsWith("/teacher")) {
    selectedKey = ["teacher"];
  } else if (location.pathname.startsWith("/student")) {
    selectedKey = ["student"];
  } else if (location.pathname.startsWith("/course")) {
    selectedKey = ["course"];
  } else if (location.pathname.startsWith("/recap")) {
    selectedKey = ["recap"];
  }

  return (
    <Layout.Sider
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
      }}
      width={240}
      collapsedWidth={60}
      collapsed={collapse}
    >
      <Menu
        items={items}
        mode="inline"
        defaultSelectedKeys={["1"]}
        selectedKeys={selectedKey}
      />
    </Layout.Sider>
  );
}

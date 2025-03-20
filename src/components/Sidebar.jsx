import useSidebarStore from "../store/sidebarStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  IconBooks,
  IconChalkboard,
  IconHome,
  IconUserPentagon,
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

import { Layout, Menu } from "antd";
import React from "react";
import useSidebarStore from "../store/sidebarStore";
import { IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const collapse = useSidebarStore((state) => state.collapse);
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: "Dashboard",
      icon: <IconHome style={{ marginLeft: -3 }} size={22} />,
      onClick: () => navigate("/"),
    },
  ];
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
      <Menu items={items} mode="inline" defaultSelectedKeys={["1"]} />
    </Layout.Sider>
  );
}

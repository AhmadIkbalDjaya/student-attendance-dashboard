import { IconLogout, IconMenu3, IconUserFilled } from "@tabler/icons-react";
import { Avatar, Button, Dropdown, Layout, Typography } from "antd";

import useSidebarStore from "../../store/sidebarStore";
import { showMessage } from "../../utils/messageUtils";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const { collapse, toggle } = useSidebarStore((state) => state);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      showMessage({ type: "success", content: "Logout successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const items = [
    {
      key: "1",
      label: user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      extra: <IconUserFilled size={12} />,
    },
    {
      key: "3",
      label: "Logout",
      extra: <IconLogout size={12} />,
      onClick: () => handleLogout(),
    },
  ];

  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        height: "fit-content",
        padding: "10px",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Button
        onClick={toggle}
        type={collapse ? "primary" : null}
        icon={<IconMenu3 size={18} />}
      />
      <Typography.Title
        level={4}
        style={{ marginLeft: "10px", marginBottom: "0" }}
      >
        Student Attendance
      </Typography.Title>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Avatar
          style={{
            marginLeft: "auto",
            cursor: "pointer",
            backgroundColor: "#1890ff",
          }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
      </Dropdown>
    </Layout.Header>
  );
}

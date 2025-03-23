import { Avatar, Button, Dropdown, Layout, Typography } from "antd";
import { IconLogout, IconMenu3, IconUserFilled } from "@tabler/icons-react";
import useSidebarStore from "../store/sidebarStore";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../utils/messageUtils";
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
  const items = [
    {
      key: "1",
      label: "Ahmad Ikbal Djaya",
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
          C
        </Avatar>
      </Dropdown>
    </Layout.Header>
  );
}

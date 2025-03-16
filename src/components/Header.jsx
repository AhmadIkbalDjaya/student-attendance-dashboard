import { Avatar, Button, Layout, Typography } from "antd";
import { IconMenu3 } from "@tabler/icons-react";
import useSidebarStore from "../store/sidebarStore";
export default function Header() {
  const { collapse, toggle } = useSidebarStore((state) => state);

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
      <Avatar style={{ marginLeft: "auto" }}>C</Avatar>
    </Layout.Header>
  );
}

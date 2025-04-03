import { Drawer, Flex, Grid, Image, Layout, Space, Typography } from "antd";

import useSidebarStore from "../../store/sidebarStore";
import logo from "../../assets/logo.png";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  const { collapse, toggle } = useSidebarStore((state) => state);
  const screens = Grid.useBreakpoint();

  const desktopSidebar = (
    <Layout.Sider
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        overflow: "auto",
        height: "100%",
        position: "sticky",
        top: 0,
        bottom: 0,
      }}
      width={240}
      collapsedWidth={60}
      collapsed={collapse}
      breakpoint="lg"
    >
      <SidebarHeader />
      <SidebarMenu />
    </Layout.Sider>
  );

  const mobileSidebar = (
    <Drawer
      placement="left"
      closable={false}
      onClose={toggle}
      open={collapse}
      width={240}
    >
      <SidebarHeader />
      <SidebarMenu />
    </Drawer>
  );

  return screens.xs ? mobileSidebar : desktopSidebar;
}

export const SidebarHeader = () => {
  const collapse = useSidebarStore((state) => state.collapse);

  return (
    <Flex
      gap={10}
      align="center"
      style={{ padding: "6px 10px", marginBottom: "5px" }}
    >
      <Image src={logo} preview={false} width={"45px"} />
      {!collapse && (
        <Space size={0} direction="vertical" style={{ flexGrow: 1 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Student Attendance
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0, marginTop: "-3px" }}>
            MA Pompanua
          </Typography.Title>
        </Space>
      )}
    </Flex>
  );
};

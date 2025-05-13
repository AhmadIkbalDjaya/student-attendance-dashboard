import { Drawer, Flex, Grid, Image, Layout, Space, Typography } from "antd";
import { useEffect, useState } from "react";

import useSidebarStore from "../../store/sidebarStore";
import { white } from "../../values/colors";
import logo from "../../assets/logo.png";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  const screens = Grid.useBreakpoint();

  return screens.xs ? <MobileSidebar /> : <DesktopSidebar />;
}

export const SidebarHeader = () => {
  const screens = Grid.useBreakpoint();
  const collapse = useSidebarStore((state) => state.collapse);
  const [showTitle, setShowTitle] = useState(!collapse);

  useEffect(() => {
    let timer;
    if (!collapse) {
      timer = setTimeout(() => {
        setShowTitle(true);
      }, 175);
    } else {
      setShowTitle(false);
    }
    return () => clearTimeout(timer);
  }, [collapse]);

  return (
    <Flex
      gap={10}
      align="center"
      style={{ padding: "6px 10px", marginBottom: "5px" }}
    >
      <Image src={logo} preview={false} width={"45px"} />
      {(screens.xs ? collapse : !collapse) &&
        (screens.xs ? !showTitle : showTitle) && (
          <Space size={0} direction="vertical" style={{ flexGrow: 1 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Student Attendance
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{ margin: 0, marginTop: "-3px" }}
            >
              MA Pompanua
            </Typography.Title>
          </Space>
        )}
    </Flex>
  );
};

const MobileSidebar = () => {
  const { collapse, toggle } = useSidebarStore((state) => state);
  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={toggle}
      open={collapse}
      width={240}
      styles={{
        body: {
          padding: "5px",
        },
      }}
    >
      <SidebarHeader />
      <SidebarMenu />
    </Drawer>
  );
};

const DesktopSidebar = () => {
  const { collapse } = useSidebarStore((state) => state);
  return (
    <Layout.Sider
      style={{
        backgroundColor: white,
        borderRadius: 8,
        overflow: "auto",
        height: "100%",
        position: "sticky",
        top: 0,
        bottom: 0,
      }}
      width={240}
      height={"100%"}
      collapsedWidth={60}
      collapsed={collapse}
      breakpoint="lg"
    >
      <SidebarHeader />
      <SidebarMenu />
    </Layout.Sider>
  );
};

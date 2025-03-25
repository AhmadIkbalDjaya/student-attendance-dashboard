import { Drawer, Grid, Layout } from "antd";

import useSidebarStore from "../../store/sidebarStore";
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
        top: 0,
        bottom: 0,
      }}
      width={240}
      collapsedWidth={60}
      collapsed={collapse}
      breakpoint="lg"
    >
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
      <SidebarMenu />
    </Drawer>
  );

  return screens.xs ? mobileSidebar : desktopSidebar;
}

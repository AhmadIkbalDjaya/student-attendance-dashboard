import { Outlet } from "react-router-dom";
import { Grid, Layout } from "antd";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function BaseLayout() {
  const screens = Grid.useBreakpoint();

  return (
    <Layout
      hasSider
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        padding: screens.xs ? 5 : 10,
        boxSizing: "border-box",
        backgroundColor: "#F5F5F5",
        gap: 10,
        overflow: "auto",
      }}
    >
      <Sidebar />
      <Layout>
        <Header />
        <Layout.Content
          style={{
            overflow: "initial",
            marginTop: 10,
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function BaseLayout() {
  return (
    <Layout
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        padding: 10,
        boxSizing: "border-box",
        backgroundColor: "#F5F5F5",
        gap: 10,
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <Layout>
        <Header />
        <Layout.Content style={{ overflow: "auto", marginTop: 10 }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

import { Breadcrumb, Table, Typography } from "antd";
import { useEffect } from "react";

import { useIndex } from "./hooks/useIndex";

export default function IndexRecapPage() {
  const { breadcrumbItems, columns, recaps, getLoading, fetchData } =
    useIndex();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Typography.Title level={3}>Recap</Typography.Title>
      <Table
        columns={columns}
        dataSource={recaps}
        pagination={false}
        rowKey={"id"}
        loading={getLoading}
        scroll={{ y: "60vh", x: "max-content" }}
      />
    </>
  );
}

import { Breadcrumb, Table, Typography } from "antd";
import { useEffect } from "react";

import { useIndex } from "./hooks/useIndex";
import TableHeaderActions from "../../components/TableHeaderActions";

export default function IndexRecapPage() {
  const {
    breadcrumbItems,
    columns,
    recaps,
    getLoading,
    fetchData,
    pagination,
    handleTableChange,
    search,
    handleSearch,
  } = useIndex();

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search]);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Typography.Title level={3}>Recap</Typography.Title>
      <TableHeaderActions
        handleSearch={handleSearch}
        createLink={"/claass/create"}
        showCreateButton={false}
      />
      <Table
        columns={columns}
        dataSource={recaps}
        rowKey={"id"}
        loading={getLoading}
        size="small"
        scroll={{ y: "60vh", x: "max-content" }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          onChange: handleTableChange,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </>
  );
}

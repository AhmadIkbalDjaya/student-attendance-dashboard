import { Breadcrumb, Table, Typography } from "antd";
import { useEffect } from "react";

import TableHeaderActions from "../../components/TableHeaderActions";
import DeleteModal from "../../components/DeleteModal";
import { useIndex } from "./hooks/useIndex";

export default function IndexCoursePage() {
  const {
    breadcrumbItems,
    columns,
    courses,
    fetchData,
    getLoading,
    handleDelete,
    deleteData,
    handleCloseDeleteModal,
    pagination,
    handleTableChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  } = useIndex();

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search]);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Typography.Title level={3}>Course</Typography.Title>
      <TableHeaderActions
        handleSearch={handleSearch}
        createLink={"/course/create"}
        showSelectedDropwdown
        selectedCount={rowSelection.selectedRowKeys.length}
        handleBulkDelete={handleBulkDelete}
      />
      <Table
        columns={columns}
        dataSource={courses}
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
        rowSelection={rowSelection}
      />

      <DeleteModal
        open={deleteData.show}
        onClose={handleCloseDeleteModal}
        onOk={() => handleDelete(deleteData.record.id)}
        title="Are you sure delete this data?"
      />
    </>
  );
}

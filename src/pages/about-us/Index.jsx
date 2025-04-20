import { Breadcrumb, Table, Typography } from "antd";
import { useEffect } from "react";

import TableHeaderActions from "../../components/TableHeaderActions";
import DeleteModal from "../../components/DeleteModal";
import { useIndex } from "./hooks/useIndex";

export default function IndexAboutUsPage() {
  const {
    breadcrumbItems,
    columns,
    aboutUses,
    getLoading,
    fetchData,
    handleDelete,
    deleteData,
    handleCloseDeleteModal,
    pagination,
    handlePaginationChange,
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
      <Typography.Title level={3}>About Us</Typography.Title>
      <TableHeaderActions
        handleSearch={handleSearch}
        createLink={"/about-us/create"}
        showSelectedDropwdown
        selectedCount={rowSelection.selectedRowKeys.length}
        handleBulkDelete={handleBulkDelete}
      />
      <Table
        columns={columns}
        dataSource={aboutUses}
        rowKey={"id"}
        loading={getLoading}
        size="small"
        scroll={{ y: "60vh", x: "max-content" }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          onChange: handlePaginationChange,
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

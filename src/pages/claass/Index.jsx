import { Breadcrumb, Button, Flex, Table, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useEffect } from "react";

import DeleteModal from "../../components/DeleteModal";
import { useIndex } from "./hooks/useIndex";

export default function IndexClaassPage() {
  const {
    fetchData,
    breadcrumbItems,
    columns,
    claasses,
    getLoading,
    deleteData,
    handleCloseDeleteModal,
    handleDelete,
  } = useIndex();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Typography.Title level={3}>Class</Typography.Title>
      <Flex justify="end" align="center" style={{ marginBottom: "10px" }}>
        <NavLink to="/claass/create">
          <Button type="primary" icon={<IconPlus />}>
            Create
          </Button>
        </NavLink>
      </Flex>
      <Table
        columns={columns}
        dataSource={claasses}
        pagination={false}
        rowKey={"id"}
        loading={getLoading}
        size="small"
        scroll={{ y: "60vh", x: "max-content" }}
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

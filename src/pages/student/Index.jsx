import { Breadcrumb, Button, Flex, Table, Typography } from "antd";
import { IconPlus } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import DeleteModal from "../../components/DeleteModal";
import { useIndex } from "./hooks/useIndex";

export default function IndexStudentPage() {
  const {
    fetchData,
    getLoading,
    columns,
    students,
    breadcrumbItems,
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
      <Typography.Title level={3}>Student</Typography.Title>
      <Flex justify="end" align="center" style={{ marginBottom: "10px" }}>
        <NavLink to="/student/create">
          <Button type="primary" icon={<IconPlus />}>
            Create
          </Button>
        </NavLink>
      </Flex>
      <Table
        columns={columns}
        dataSource={students}
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

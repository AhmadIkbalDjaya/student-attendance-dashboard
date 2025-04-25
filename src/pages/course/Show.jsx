import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useIndex as useIndexStudent } from "../student/hooks/useIndex";
import TableHeaderActions from "../../components/TableHeaderActions";
import DeleteModal from "../../components/DeleteModal";
import { useShow } from "./hooks/useShow";
import { descriptionsLabelStyle } from "../../values/styles";

export default function ShowCoursePage() {
  const { id } = useParams();
  const {
    breadcrumbItems,
    fetchStudent,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
    descriptionItemsTimestamp,
  } = useShow();

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Course Detail</Typography.Title>
        <Flex gap={10}>
          <Button onClick={handleClickDelete} color="danger" variant="outlined">
            Delete
          </Button>
          <Link to={`/course/${id}/edit`}>
            <Button color="primary" variant="solid">
              Edit
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Row gutter={[12, 10]}>
        <Col xs={24} md={16}>
          <Card title={"Course Information"} loading={fetchLoading}>
            <Descriptions
              size="small"
              items={descriptionItems}
              column={2}
              layout="vertical"
              labelStyle={descriptionsLabelStyle}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card loading={fetchLoading}>
            <Descriptions
              size="small"
              items={descriptionItemsTimestamp}
              column={2}
              layout="vertical"
              labelStyle={descriptionsLabelStyle}
            />
          </Card>
        </Col>
      </Row>

      <Card
        size="small"
        style={{ display: "block", width: "fit-content", margin: "25px auto" }}
      >
        <Radio.Group
          block
          options={[{ label: "Students", value: "students" }]}
          optionType="button"
          value={"students"}
        />
      </Card>

      <Card>
        <CourseStudents />
      </Card>
    </>
  );
}

const CourseStudents = () => {
  const { id } = useParams();
  const {
    fetchData,
    getLoading,
    columns,
    students,
    deleteData,
    handleCloseDeleteModal,
    handleDelete,
    pagination,
    handlePaginationChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  } = useIndexStudent({ courseId: id });

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search]);

  return (
    <>
      <TableHeaderActions
        handleSearch={handleSearch}
        showCreateButton={false}
        showSelectedDropwdown
        selectedCount={rowSelection.selectedRowKeys.length}
        handleBulkDelete={handleBulkDelete}
      />
      <Table
        columns={columns.filter((col) => col.key !== "action")}
        dataSource={students}
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
};

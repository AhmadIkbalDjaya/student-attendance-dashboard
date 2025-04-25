import {
  Breadcrumb,
  Card,
  Col,
  Descriptions,
  Flex,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useIndex as useIndexStudent } from "../student/hooks/useIndex";
import { useIndex as useIndexCourse } from "../course/hooks/useIndex";
import TableHeaderActions from "../../components/TableHeaderActions";
import { descriptionsLabelStyle } from "../../values/styles";
import DeleteModal from "../../components/DeleteModal";
import ShowAction from "../../components/ShowAction";
import { useShow } from "./hooks/useShow";

export default function ShowClaassPage() {
  const { id } = useParams();
  const {
    breadcrumbItems,
    fetchClaass,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
    descriptionItemsTimestamp,
    showRelation,
    setShowRelation,
  } = useShow();

  useEffect(() => {
    fetchClaass();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Class Detail</Typography.Title>
        <ShowAction
          handleClickDelete={handleClickDelete}
          editLink={`/student/${id}/edit`}
        />
      </Flex>
      <Row gutter={[12, 10]}>
        <Col xs={24} md={16}>
          <Card title={"Class Information"} loading={fetchLoading}>
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
          options={[
            { label: "Students", value: "students" },
            { label: "Courses", value: "courses" },
          ]}
          optionType="button"
          value={showRelation}
          onChange={(e) => setShowRelation(e.target.value)}
        />
      </Card>

      <Card>
        {showRelation === "students" && <ClaassStudents />}
        {showRelation === "courses" && <ClaassCourses />}
      </Card>
    </>
  );
}

const ClaassStudents = () => {
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
  } = useIndexStudent({ claassId: id });

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search]);

  return (
    <>
      <TableHeaderActions
        handleSearch={handleSearch}
        createLink={`/student/create?claass_id=${id}`}
        showSelectedDropwdown
        selectedCount={rowSelection.selectedRowKeys.length}
        handleBulkDelete={handleBulkDelete}
      />
      <Table
        columns={columns}
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

const ClaassCourses = () => {
  const { id } = useParams();
  const {
    columns,
    courses,
    fetchData,
    getLoading,
    handleDelete,
    deleteData,
    handleCloseDeleteModal,
    pagination,
    handlePaginationChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  } = useIndexCourse({ claassId: id });

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search]);

  return (
    <>
      <TableHeaderActions
        handleSearch={handleSearch}
        createLink={`/course/create?claass_id=${id}`}
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

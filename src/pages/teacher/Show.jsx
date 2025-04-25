import {
  Breadcrumb,
  Card,
  Col,
  Descriptions,
  Flex,
  Form,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useIndex as useIndexCourse } from "../course/hooks/useIndex";
import TableHeaderActions from "../../components/TableHeaderActions";
import ChangePasswordForm from "./components/ChangePasswordForm";
import { descriptionsLabelStyle } from "../../values/styles";
import DeleteModal from "../../components/DeleteModal";
import ShowAction from "../../components/ShowAction";
import { useShow } from "./hooks/useShow";

export default function ShowTeacherPage() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const {
    breadcrumbItems,
    fetchTeacher,
    fetchLoading,
    handleClickDelete,
    handleSubmitForm,
    submitLoading,
    descriptionItems,
  } = useShow();

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Teacher Detail</Typography.Title>
        <ShowAction
          handleClickDelete={handleClickDelete}
          editLink={`/teacher/${id}/edit`}
        />
      </Flex>
      <Row gutter={[12, 10]}>
        <Col xs={24} sm={16}>
          <Card title={"Teacher Information"} loading={fetchLoading}>
            <Descriptions
              size="small"
              items={descriptionItems}
              column={2}
              layout="vertical"
              labelStyle={descriptionsLabelStyle}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <ChangePasswordForm
            form={form}
            handleSubmitForm={() => handleSubmitForm(form)}
            fetchLoading={fetchLoading}
            submitLoading={submitLoading}
          />
        </Col>
      </Row>

      <Card
        size="small"
        style={{ display: "block", width: "fit-content", margin: "25px auto" }}
      >
        <Radio.Group
          block
          options={[{ label: "Courses", value: "courses" }]}
          optionType="button"
          value={"courses"}
        />
      </Card>

      <Card>
        <TeacherCourses />
      </Card>
    </>
  );
}

const TeacherCourses = () => {
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
  } = useIndexCourse({ teacherId: id });

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search]);

  return (
    <>
      <TableHeaderActions
        handleSearch={handleSearch}
        createLink={`/course/create?teacher_id=${id}`}
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

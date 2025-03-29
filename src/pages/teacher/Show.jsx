import { Breadcrumb, Card, Col, Flex, Form, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import ChangePasswordForm from "./components/ChangePasswordForm";
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
    teacher,
    handleSubmitForm,
    submitLoading,
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
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={16}>
          <Card title={"Teacher Information"} loading={fetchLoading}>
            <Row gutter={[12, 12]} justify={"space-between"}>
              <Col span={12}>
                <Typography.Title level={5}>Name</Typography.Title>
                <Typography.Text>{teacher?.name}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Username</Typography.Title>
                <Typography.Text>{teacher?.username}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Email</Typography.Title>
                <Typography.Text>{teacher?.email}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Phone</Typography.Title>
                <Typography.Text>{teacher?.phone}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Gender</Typography.Title>
                <Typography.Text style={{ textTransform: "capitalize" }}>
                  {teacher?.gender}
                </Typography.Text>
              </Col>
            </Row>
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
    </>
  );
}

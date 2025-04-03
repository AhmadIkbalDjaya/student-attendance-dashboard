import {
  Breadcrumb,
  Card,
  Col,
  Descriptions,
  Flex,
  Form,
  Row,
  Typography,
} from "antd";
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
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={16}>
          <Card title={"Teacher Information"} loading={fetchLoading}>
            <Descriptions
              size="small"
              items={descriptionItems}
              column={2}
              layout="vertical"
              labelStyle={{
                fontWeight: "500",
                fontSize: "16px",
                color: "black",
              }}
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
    </>
  );
}

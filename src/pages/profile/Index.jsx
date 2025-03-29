import {
  Breadcrumb,
  Card,
  Col,
  Descriptions,
  Form,
  Row,
  Typography,
} from "antd";

import ChangePasswordForm from "./components/ChangePasswordForm";
import { useProfile } from "./useProfile";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const { breadcrumbItems, descriptionItems, handleSubmitForm, loadingSubmit } =
    useProfile();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Typography.Title level={3}>Profile</Typography.Title>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={14}>
          <Card title="Personal Information">
            <Descriptions size="default" items={descriptionItems} column={2} />
          </Card>
        </Col>
        <Col xs={24} sm={10}>
          <ChangePasswordForm
            form={form}
            handleSubmitForm={() => handleSubmitForm(form)}
            loadingSubmit={loadingSubmit}
          />
        </Col>
      </Row>
    </>
  );
}

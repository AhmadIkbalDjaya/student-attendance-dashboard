import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { changeAuthPassword } from "../../services/authService";
import { showMessage } from "../../utils/messageUtils";
import { useState } from "react";

export default function ProfilePage() {
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmitForm = async () => {
    try {
      console.log(form.getFieldValue());

      setLoadingSubmit(true);
      await changeAuthPassword(form.getFieldValue());
      form.resetFields();
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const descriptionItems = [
    {
      key: "username",
      label: "Username",
      children: user?.username,
      span: { xs: 2, sm: 1 },
    },
    {
      key: "email",
      label: "Email",
      children: user?.email,
      span: { xs: 2, sm: 1 },
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Profile",
    },
  ];

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
          <Card title="Change Password">
            <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
              <Form.Item name="old_password" label="Current Password">
                <Input.Password placeholder="Current Password" />
              </Form.Item>
              <Form.Item name="new_password" label="New Password">
                <Input.Password placeholder="New Password" />
              </Form.Item>
              <Form.Item
                name="new_password_confirmation"
                label="New Password Confirmation"
              >
                <Input.Password placeholder="Reenter New Password" />
              </Form.Item>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  variant="solid"
                  style={{ width: "100%" }}
                  htmlType="submit"
                  loading={loadingSubmit}
                >
                  Change Passoword
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

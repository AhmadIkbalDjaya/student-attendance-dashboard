import { Button, Card, Form, Input } from "antd";

export default function ChangePasswordForm({
  form,
  handleSubmitForm,
  loadingSubmit,
}) {
  return (
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
  );
}

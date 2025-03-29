import { Button, Card, Form, Input } from "antd";

export default function ChangePasswordForm({
  form,
  handleSubmitForm,
  fetchLoading,
  submitLoading,
}) {
  return (
    <Card loading={fetchLoading} title="Change Password">
      <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
        <Form.Item name="password" label="Password">
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            variant="solid"
            style={{ width: "100%" }}
            htmlType="submit"
            loading={submitLoading}
          >
            Change
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

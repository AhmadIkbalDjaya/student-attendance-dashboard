import { Card, Col, Form, Input, Row, Skeleton } from "antd";
export default function MajorForm({
  form,
  handleSubmit,
  fetchLoading = false,
}) {
  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      >
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Input placeholder="Enter name" />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

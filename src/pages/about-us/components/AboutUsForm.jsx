import { Card, Col, Form, Input, Row } from "antd";
export default function AboutUsForm({ form, handleSubmit }) {
  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: "Position is required" }]}
            >
              <Input placeholder="Enter Position" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input placeholder="Enter Phone" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

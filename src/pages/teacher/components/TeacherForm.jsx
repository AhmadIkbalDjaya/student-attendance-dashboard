import { Card, Col, Form, Input, Row, Select } from "antd";

export default function TeacherForm({ form, handleSubmit, type = "store" }) {
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
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          {type == "store" && (
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item name="phone" label="Phone">
              <Input placeholder="Enter phone" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Gender is required" }]}
            >
              <Select
                options={["male", "female"].map((value) => ({
                  value: value.toString(),
                  label: value,
                }))}
                placeholder="Select teacher gender"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

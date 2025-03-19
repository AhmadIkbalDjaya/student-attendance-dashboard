import { Card, Col, Form, InputNumber, Row, Select } from "antd";

export default function SemesterForm({ form, handleSubmit }) {
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
              name="start_year"
              label="Start Year"
              rules={[{ required: true, message: "Start Year is required" }]}
            >
              <InputNumber
                min={2020}
                max={2050}
                style={{ width: "100%" }}
                placeholder="example: 2025"
                onChange={(e) => form.setFieldValue("end_year", e + 1)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="end_year" label="End Year">
              <InputNumber
                min={2021}
                max={2051}
                style={{ width: "100%" }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="odd_even" label="Category" required>
              <Select
                options={[
                  {
                    value: 1,
                    label: "Odd",
                  },
                  {
                    value: 0,
                    label: "Even",
                  },
                ]}
                placeholder="Select Semester Category"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

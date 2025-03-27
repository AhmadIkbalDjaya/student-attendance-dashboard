import { Card, Col, Form, InputNumber, Row, Select, Skeleton } from "antd";

export default function SemesterForm({
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
              name="start_year"
              label="Start Year"
              rules={[{ required: true, message: "Start Year is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <InputNumber
                  min={2020}
                  max={2050}
                  style={{ width: "100%" }}
                  placeholder="example: 2025"
                  onChange={(e) => form.setFieldValue("end_year", e + 1)}
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="end_year" label="End Year">
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <InputNumber
                  min={2021}
                  max={2051}
                  style={{ width: "100%" }}
                  disabled
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="odd_even" label="Category" required>
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
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
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

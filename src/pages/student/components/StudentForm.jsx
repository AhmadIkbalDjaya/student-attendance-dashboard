import { Card, Col, Form, Input, Row, Select } from "antd";
import { getAllClaasses } from "../../../services/claassService";
import { useEffect, useState } from "react";

export default function StudentForm({ form, handleSubmit }) {
  const [claasses, setClaasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const result = await getAllClaasses();
      setClaasses(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

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
              name="nis"
              label="NIS"
              rules={[{ required: true, message: "NIS is required" }]}
            >
              <Input placeholder="Enter nis" />
            </Form.Item>
          </Col>
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
          <Col span={12}>
            <Form.Item
              name="claass_id"
              label="Class"
              rules={[{ required: true, message: "Class is required" }]}
            >
              <Select
                options={claasses.map((value) => ({
                  value: value.id,
                  label: value.name,
                }))}
                placeholder="Select student Class"
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

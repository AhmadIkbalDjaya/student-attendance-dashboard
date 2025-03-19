import { Card, Col, Form, Input, InputNumber, Row, Select } from "antd";

import { getAllMajors } from "../../../services/majorService";
import { useEffect, useState } from "react";
export default function ClaassForm({ form, handleSubmit }) {
  const [majors, setMajors] = useState([]);

  const fetchMajors = async () => {
    try {
      const result = await getAllMajors();
      setMajors(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchMajors();
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
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input style={{ width: "100%" }} placeholder="Class Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="level"
              label="Level"
              rules={[{ required: true, message: "Level is required" }]}
            >
              <Select
                options={[10, 11, 12].map((value) => ({
                  value: value.toString(),
                  label: value,
                }))}
                placeholder="Select Class Level"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="major_id"
              label="Major"
              rules={[{ required: true, message: "Major is required" }]}
            >
              <Select
                options={majors.map((major) => ({
                  value: major.id,
                  label: major.name,
                }))}
                placeholder="Select Class Major"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

import { Card, Col, Form, Input, Row, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";

import { getAllMajors } from "../../../services/majorService";
export default function ClaassForm({
  form,
  handleSubmit,
  fetchLoading = false,
}) {
  const [majors, setMajors] = useState([]);
  const [fetchMajorLoading, setFetchMajorLoading] = useState(false);

  const fetchMajors = async () => {
    try {
      setFetchMajorLoading(true);
      const result = await getAllMajors();
      setMajors(result.data);
      setFetchMajorLoading(false);
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
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Input placeholder="Class Name" />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="level"
              label="Level"
              rules={[{ required: true, message: "Level is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Select
                  options={[10, 11, 12].map((value) => ({
                    value: value.toString(),
                    label: value,
                  }))}
                  placeholder="Select Class Level"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="major_id"
              label="Major"
              rules={[{ required: true, message: "Major is required" }]}
            >
              {fetchLoading || fetchMajorLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Select
                  options={majors.map((major) => ({
                    value: major.id,
                    label: major.name,
                  }))}
                  placeholder="Select Class Major"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

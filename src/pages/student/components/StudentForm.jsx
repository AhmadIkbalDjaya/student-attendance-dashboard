import { Card, Col, Form, Input, Row, Select, Skeleton } from "antd";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAllClaasses } from "../../../services/claassService";

export default function StudentForm({
  form,
  handleSubmit,
  fetchLoading = false,
}) {
  const [claasses, setClaasses] = useState([]);
  const [fetchClassLoading, setFetchClassLoading] = useState(false);
  const fetchClasses = async () => {
    try {
      setFetchClassLoading(true);
      const result = await getAllClaasses(1, 100);
      setClaasses(result.data);
      setFetchClassLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const [searchParams] = useSearchParams();
  const claass_id = searchParams.get("claass_id");

  useEffect(() => {
    if (claass_id) {
      form.setFieldValue("claass_id", parseInt(claass_id));
    }
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
          <Col xs={24} sm={12}>
            <Form.Item
              name="nis"
              label="NIS"
              rules={[{ required: true, message: "NIS is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Input placeholder="Enter nis" />
              )}
            </Form.Item>
          </Col>
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
          <Col xs={24} sm={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Gender is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Select
                  options={["male", "female"].map((value) => ({
                    value: value.toString(),
                    label: value,
                  }))}
                  placeholder="Select teacher gender"
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="claass_id"
              label="Class"
              rules={[{ required: true, message: "Class is required" }]}
            >
              {fetchLoading || fetchClassLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
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
                  disabled={claass_id !== null}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

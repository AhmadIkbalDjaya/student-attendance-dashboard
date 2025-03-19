import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { createSemester } from "../../services/semesterService";
import { showMessage } from "../../utils/messageUtils";
import { useState } from "react";

export default function CreateSemesterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await createSemester(form.getFieldValue());
      navigate("/semester");
      showMessage({ type: "success", content: "Created successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Semester</Typography.Title>
        <Flex gap={10}>
          <Button
            color="danger"
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            loading={submitLoading}
            onClick={handleSubmit}
            color="primary"
            variant="solid"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
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
    </>
  );
}

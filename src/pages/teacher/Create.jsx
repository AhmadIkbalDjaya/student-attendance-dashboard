import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createTeacher } from "../../services/teacherService";
import { showMessage } from "../../utils/messageUtils";
import TeacherForm from "./components/TeacherForm";

export default function CreateTeacherPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await createTeacher(form.getFieldValue());
      navigate("/teacher");
      showMessage({ type: "success", content: "Created successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/teacher">Teacher</Link>,
    },
    {
      title: "Create Teacher",
    },
  ];

  return (
      <>
        <Breadcrumb separator=">" items={breadcrumbItems} />
        <Flex justify="space-between" style={{ margin: "10px 0" }}>
          <Typography.Title level={3}>Create Teacher</Typography.Title>
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
        <TeacherForm form={form} handleSubmit={handleSubmit} />
      </>
    );
}

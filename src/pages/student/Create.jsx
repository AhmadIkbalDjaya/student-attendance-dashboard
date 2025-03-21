import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createStudent } from "../../services/studentService";
import { showMessage } from "../../utils/messageUtils";
import StudentForm from "./components/StudentForm";

export default function CreateStudentPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    console.log(form.getFieldValue());

    try {
      setSubmitLoading(true);
      await createStudent(form.getFieldValue());
      navigate("/student");
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
      title: <Link to="/student">Student</Link>,
    },
    {
      title: "Create Student",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Student</Typography.Title>
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
      <StudentForm form={form} handleSubmit={handleSubmit} />
    </>
  );
}

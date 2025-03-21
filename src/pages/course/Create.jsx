import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createCourse } from "../../services/courseService";
import { showMessage } from "../../utils/messageUtils";
import CourseForm from "./components/CourseForm";

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    console.log(form.getFieldValue());

    try {
      setSubmitLoading(true);
      await createCourse(form.getFieldValue());
      navigate("/course");
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
      title: <Link to="/course">Course</Link>,
    },
    {
      title: "Create Course",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Course</Typography.Title>
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
      <CourseForm form={form} handleSubmit={handleSubmit} />
    </>
  );
}

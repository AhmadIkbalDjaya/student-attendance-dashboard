import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCourse, updateCourse } from "../../services/courseService";
import { showMessage } from "../../utils/messageUtils";
import CourseForm from "./components/CourseForm";

export default function EditCoursePage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { id } = useParams();
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await updateCourse(id, form.getFieldValue());
      navigate("/course");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  const fetchCourse = async () => {
    try {
      const result = await getCourse(id);
      form.setFieldsValue(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
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
      title: "Edit Course",
    },
  ];

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Edit Course</Typography.Title>
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

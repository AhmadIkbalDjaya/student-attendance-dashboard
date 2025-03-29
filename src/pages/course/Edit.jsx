import { Breadcrumb, Flex, Form, Typography } from "antd";
import { useEffect } from "react";

import EditAction from "../../components/EditAction";
import CourseForm from "./components/CourseForm";
import { useEdit } from "./hooks/useEdit";

export default function EditCoursePage() {
  const [form] = Form.useForm();
  const {
    breadcrumbItems,
    fetchCourse,
    fetchLoading,
    handleSubmit,
    submitLoading,
  } = useEdit();

  useEffect(() => {
    fetchCourse(form);
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Edit Course</Typography.Title>
        <EditAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <CourseForm
        form={form}
        handleSubmit={() => handleSubmit(form)}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

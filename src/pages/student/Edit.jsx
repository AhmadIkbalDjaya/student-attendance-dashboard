import { Breadcrumb, Flex, Form, Typography } from "antd";
import { useEffect } from "react";

import EditAction from "../../components/EditAction";
import StudentForm from "./components/StudentForm";
import { useEdit } from "./hooks/useEdit";

export default function EditStudentPage() {
  const [form] = Form.useForm();
  const {
    breadcrumbItems,
    fetchStudent,
    fetchLoading,
    handleSubmit,
    submitLoading,
  } = useEdit();

  useEffect(() => {
    fetchStudent(form);
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Edit Student</Typography.Title>
        <EditAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <StudentForm
        form={form}
        handleSubmit={() => handleSubmit(form)}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

import { Breadcrumb, Flex, Form, Typography } from "antd";
import { useEffect } from "react";

import EditAction from "../../components/EditAction";
import TeacherForm from "./components/TeacherForm";
import { useEdit } from "./hooks/useEdit";

export default function EditTeacherPage() {
  const [form] = Form.useForm();
  const {
    breadcrumbItems,
    fetchTeacher,
    fetchLoading,
    handleSubmit,
    submitLoading,
  } = useEdit();

  useEffect(() => {
    fetchTeacher(form);
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Edit Teacher</Typography.Title>
        <EditAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <TeacherForm
        form={form}
        handleSubmit={() => handleSubmit(form)}
        type="update"
        fetchLoading={fetchLoading}
      />
    </>
  );
}

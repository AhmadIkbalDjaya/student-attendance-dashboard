import { Breadcrumb, Flex, Form, Typography } from "antd";
import { useEffect } from "react";

import EditAction from "../../components/EditAction";
import SemesterForm from "./components/SemesterForm";
import { useEdit } from "./hooks/useEdit";

export default function EditSemesterPage() {
  const [form] = Form.useForm();
  const {
    breadcrumbItems,
    fetchSemester,
    fetchLoading,
    handleSubmit,
    submitLoading,
  } = useEdit();

  useEffect(() => {
    fetchSemester(form);
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Edit Semester</Typography.Title>
        <EditAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <SemesterForm
        form={form}
        handleSubmit={() => handleSubmit(form)}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

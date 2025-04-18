import { Breadcrumb, Flex, Form, Typography } from "antd";
import { useEffect } from "react";

import EditAction from "../../components/EditAction";
import { useEdit } from "./hooks/useEdit";
import MajorForm from "./components/MajorForm";

export default function EditMajorPage() {
  const [form] = Form.useForm();
  const {
    breadcrumbItems,
    fetchData,
    fetchLoading,
    handleSubmit,
    submitLoading,
  } = useEdit();

  useEffect(() => {
    fetchData(form);
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Edit Major</Typography.Title>
        <EditAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <MajorForm
        form={form}
        handleSubmit={() => handleSubmit(form)}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

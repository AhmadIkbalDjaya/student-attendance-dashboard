import { Breadcrumb, Flex, Form, Typography } from "antd";
import { useEffect } from "react";

import EditAction from "../../components/EditAction";
import ClaassForm from "./components/ClaassForm";
import { useEdit } from "./hooks/useEdit";

export default function EditClaassPage() {
  const [form] = Form.useForm();
  const {
    fetchClaass,
    fetchLoading,
    breadcrumbItems,
    handleSubmit,
    submitLoading,
  } = useEdit();

  useEffect(() => {
    fetchClaass(form);
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Class</Typography.Title>
        <EditAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <ClaassForm
        form={form}
        handleSubmit={() => handleSubmit(form)}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

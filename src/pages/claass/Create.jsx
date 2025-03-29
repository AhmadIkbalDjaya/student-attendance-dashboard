import { Breadcrumb, Flex, Form, Typography } from "antd";

import CreateAction from "../../components/CreateAction";
import ClaassForm from "./components/ClaassForm";
import { useCreate } from "./hooks/useCreate";

export default function CreateClaassPage() {
  const [form] = Form.useForm();
  const { breadcrumbItems, submitLoading, handleSubmit } = useCreate();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Class</Typography.Title>
        <CreateAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <ClaassForm form={form} handleSubmit={() => handleSubmit(form)} />
    </>
  );
}

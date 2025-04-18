import { Breadcrumb, Flex, Form, Typography } from "antd";

import CreateAction from "../../components/CreateAction";
import MajorForm from "./components/MajorForm";
import { useCreate } from "./hooks/useCreate";

export default function CreateMajorPage() {
  const { breadcrumbItems, handleSubmit, submitLoading } = useCreate();
  const [form] = Form.useForm();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Major</Typography.Title>
        <CreateAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <MajorForm form={form} handleSubmit={() => handleSubmit(form)} />
    </>
  );
}

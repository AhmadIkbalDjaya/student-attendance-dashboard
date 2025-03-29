import { Breadcrumb, Flex, Form, Typography } from "antd";

import CreateAction from "../../components/CreateAction";
import TeacherForm from "./components/TeacherForm";
import { useCreate } from "./hooks/useCreate";

export default function CreateTeacherPage() {
  const [form] = Form.useForm();
  const { breadcrumbItems, handleSubmit, submitLoading } = useCreate();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Teacher</Typography.Title>
        <CreateAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <TeacherForm form={form} handleSubmit={() => handleSubmit(form)} />
    </>
  );
}

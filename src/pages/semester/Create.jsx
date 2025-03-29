import { Breadcrumb, Flex, Form, Typography } from "antd";

import CreateAction from "../../components/CreateAction";
import SemesterForm from "./components/SemesterForm";
import { useCreate } from "./hooks/useCreate";

export default function CreateSemesterPage() {
  const [form] = Form.useForm();
  const { breadcrumbItems, submitLoading, handleSubmit } = useCreate();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Semester</Typography.Title>
        <CreateAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <SemesterForm form={form} handleSubmit={() => handleSubmit(form)} />
    </>
  );
}

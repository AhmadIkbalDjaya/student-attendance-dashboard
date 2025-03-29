import { Breadcrumb, Flex, Form, Typography } from "antd";

import CreateAction from "../../components/CreateAction";
import StudentForm from "./components/StudentForm";
import { useCreate } from "./hooks/useCreate";

export default function CreateStudentPage() {
  const [form] = Form.useForm();
  const { breadcrumbItems, handleSubmit, submitLoading } = useCreate();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Student</Typography.Title>
        <CreateAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <StudentForm form={form} handleSubmit={() => handleSubmit(form)} />
    </>
  );
}

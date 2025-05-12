import { Breadcrumb, Flex, Form, Typography } from "antd";

import CreateAction from "../../components/CreateAction";
import AttendanceForm from "./components/AttendanceForm";
import { useCreate } from "./hooks/useCreate";


export const CreateAttendancePage = () => {
  const [form] = Form.useForm();
  const { breadcrumbItems, handleSubmit, submitLoading } = useCreate();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Course</Typography.Title>
        <CreateAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <AttendanceForm form={form} handleSubmit={() => handleSubmit(form)} />
    </>
  );
};

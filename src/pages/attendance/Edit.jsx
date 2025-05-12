import { Breadcrumb, Flex, Form, Typography } from "antd";
import { useEffect } from "react";

import AttendanceForm from "./components/AttendanceForm";
import EditAction from "../../components/EditAction";
import { useEdit } from "./hooks/useEdit";

export default function EditAttendancePage() {
  const [form] = Form.useForm();
  const {
    breadcrumbItems,
    fetchAttendance,
    fetchLoading,
    handleSubmit,
    submitLoading,
  } = useEdit();

  useEffect(() => {
    fetchAttendance(form);
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Edit Attendance</Typography.Title>
        <EditAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <AttendanceForm
        form={form}
        fetchLoading={fetchLoading}
        handleSubmit={handleSubmit}
        type="update"
      />
    </>
  );
}

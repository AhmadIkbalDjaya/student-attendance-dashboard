import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SemesterForm from "./components/SemesterForm";
import { useEdit } from "./hooks/useEdit";

export default function EditSemesterPage() {
  const navigate = useNavigate();
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
        <Flex gap={10}>
          <Button
            color="danger"
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            loading={submitLoading}
            onClick={() => handleSubmit(form)}
            color="primary"
            variant="solid"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
      <SemesterForm
        form={form}
        handleSubmit={() => handleSubmit(form)}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

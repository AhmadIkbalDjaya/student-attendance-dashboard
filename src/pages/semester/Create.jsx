import { Button, Flex, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createSemester } from "../../services/semesterService";
import { showMessage } from "../../utils/messageUtils";
import SemesterForm from "./SemesterForm";

export default function CreateSemesterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await createSemester(form.getFieldValue());
      navigate("/semester");
      showMessage({ type: "success", content: "Created successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Semester</Typography.Title>
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
            onClick={handleSubmit}
            color="primary"
            variant="solid"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
      <SemesterForm form={form} handleSubmit={handleSubmit} />
    </>
  );
}

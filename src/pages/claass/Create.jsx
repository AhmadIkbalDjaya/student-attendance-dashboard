import { Button, Flex, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createClaass } from "../../services/claassService";
import { showMessage } from "../../utils/messageUtils";
import ClaassForm from "./components/ClaassForm";

export default function CreateClaassPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await createClaass(form.getFieldValue());
      navigate("/claass");
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
        <Typography.Title level={3}>Create Class</Typography.Title>
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
      <ClaassForm form={form} handleSubmit={handleSubmit} />
    </>
  );
}

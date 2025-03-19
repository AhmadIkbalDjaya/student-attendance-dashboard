import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { useEffect, useState } from "react";

import { getClaass, updateClaass } from "../../services/claassService";
import { showMessage } from "../../utils/messageUtils";
import ClaassForm from "./components/ClaassForm";

export default function EditClaassPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await updateClaass(id, form.getFieldValue());
      navigate("/claass");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchClaass = async () => {
    try {
      const result = await getClaass(id);
      form.setFieldsValue(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchClaass();
  }, []);

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/claass">Class</Link>,
    },
    {
      title: "Edit Class",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
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

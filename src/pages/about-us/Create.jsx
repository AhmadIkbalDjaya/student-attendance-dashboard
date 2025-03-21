import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createAboutUs } from "../../services/aboutUsService";
import { showMessage } from "../../utils/messageUtils";
import AboutUsForm from "./components/AboutUsForm";

export default function CreateAboutUsPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await createAboutUs(form.getFieldValue());
      navigate("/about-us");
      showMessage({ type: "success", content: "Created successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/about-us">About Us</Link>,
    },
    {
      title: "Create About Us",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create About Us</Typography.Title>
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
      <AboutUsForm form={form} handleSubmit={handleSubmit} />
    </>
  );
}

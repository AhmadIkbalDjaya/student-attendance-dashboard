import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { useEffect, useState } from "react";

import { getAboutUs, updateAboutUs } from "../../services/aboutUsService";
import { showMessage } from "../../utils/messageUtils";
import AboutUsForm from "./components/AboutUsForm";

export default function EditAboutUsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await updateAboutUs(id, form.getFieldValue());
      navigate("/about-us");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      const result = await getAboutUs(id);
      form.setFieldsValue(result.data);
      setFetchLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/about-us">About Us</Link>,
    },
    {
      title: "Edit About Us",
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
      <AboutUsForm
        form={form}
        handleSubmit={handleSubmit}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

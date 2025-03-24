import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getSemester, updateSemester } from "../../services/semesterService";
import { showMessage } from "../../utils/messageUtils";
import SemesterForm from "./components/SemesterForm";

export default function EditSemesterPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await updateSemester(id, form.getFieldValue());
      navigate("/semester");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchSemester = async () => {
    try {
      setFetchLoading(true);
      const result = await getSemester(id);
      form.setFieldsValue(result.data);
      setFetchLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchSemester();
  }, []);

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/semester">Semester</Link>,
    },
    {
      title: "Edit Semester",
    },
  ];
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
            onClick={handleSubmit}
            color="primary"
            variant="solid"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
      <SemesterForm
        form={form}
        handleSubmit={handleSubmit}
        fetchLoading={fetchLoading}
      />
    </>
  );
}

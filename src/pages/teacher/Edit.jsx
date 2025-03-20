import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getTeacher, updateTeacher } from "../../services/teacherService";
import { showMessage } from "../../utils/messageUtils";
import TeacherForm from "./components/TeacherForm";

export default function EditTeacherPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { id } = useParams();
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await updateTeacher(id, form.getFieldValue());
      navigate("/teacher");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  const fetchTeacher = async () => {
    try {
      const result = await getTeacher(id);
      form.setFieldsValue(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };
  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/teacher">Teacher</Link>,
    },
    {
      title: "Edit Teacher",
    },
  ];

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Teacher</Typography.Title>
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
      <TeacherForm form={form} handleSubmit={handleSubmit} type="update" />
    </>
  );
}

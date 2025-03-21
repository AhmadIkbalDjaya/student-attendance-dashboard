import { Breadcrumb, Button, Flex, Form, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getStudent, updateStudent } from "../../services/studentService";
import { showMessage } from "../../utils/messageUtils";
import StudentForm from "./components/StudentForm";

export default function EditStudentPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { id } = useParams();
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await updateStudent(id, form.getFieldValue());
      navigate("/teacher");
      showMessage({ type: "success", content: "Updated successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  const fetchStudent = async () => {
    try {
      const result = await getStudent(id);
      form.setFieldsValue(result.data);
      console.log(form.getFieldValue());
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/student">Student</Link>,
    },
    {
      title: "Edit Student",
    },
  ];

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Student</Typography.Title>
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
      <StudentForm form={form} handleSubmit={handleSubmit} />
    </>
  );
}

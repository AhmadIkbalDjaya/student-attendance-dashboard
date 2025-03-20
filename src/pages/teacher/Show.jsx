import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  deleteTeacher,
  getTeacher,
  setTeacherPassword,
} from "../../services/teacherService";
import { showMessage } from "../../utils/messageUtils";

export default function ShowTeacherPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const fetchTeacher = async () => {
    try {
      setFetchLoading(true);
      const result = await getTeacher(id);
      setTeacher(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      navigate("/teacher");
      showMessage({ type: "success", content: "Deleted successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const handleClickDelete = () => {
    Modal.confirm({
      title: "Are you sure delete this data?",
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: () => handleDelete(id),
    });
  };

  const handleSubmitForm = async () => {
    try {
      setSubmitLoading(true);
      await setTeacherPassword(id, form.getFieldValue());
      showMessage({ type: "success", content: "Updated successfully" });
      form.setFieldValue("password", "");
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);
  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/teacher">Teacher</Link>,
    },
    {
      title: "Detail Teacher",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create Teacher</Typography.Title>
        <Flex gap={10}>
          <Button onClick={handleClickDelete} color="danger" variant="outlined">
            Delete
          </Button>
          <Link to={`/teacher/${id}/edit`}>
            <Button color="primary" variant="solid">
              Edit
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Row gutter={12}>
        <Col span={16}>
          <Card title={"Teacher Information"} loading={fetchLoading}>
            <Row gutter={[12, 12]} justify={"space-between"}>
              <Col span={12}>
                <Typography.Title level={5}>Name</Typography.Title>
                <Typography.Text>{teacher?.name}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Username</Typography.Title>
                <Typography.Text>{teacher?.username}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Email</Typography.Title>
                <Typography.Text>{teacher?.email}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Phone</Typography.Title>
                <Typography.Text>{teacher?.phone}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Gender</Typography.Title>
                <Typography.Text style={{ textTransform: "capitalize" }}>
                  {teacher?.gender}
                </Typography.Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={fetchLoading} title="Change Password">
            <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
              <Form.Item name="password" label="Password">
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  variant="solid"
                  style={{ width: "100%" }}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  Change
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

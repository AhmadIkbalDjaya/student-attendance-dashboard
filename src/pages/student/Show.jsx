import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Modal,
  Row,
  Typography,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { deleteStudent, getStudent } from "../../services/studentService";
import { showMessage } from "../../utils/messageUtils";

export default function ShowStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const fetchStudent = async () => {
    try {
      setFetchLoading(true);
      const result = await getStudent(id);
      setStudent(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      navigate("/student");
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

  useEffect(() => {
    fetchStudent();
  }, []);

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/student">Student</Link>,
    },
    {
      title: "Detail Student",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Stduent Detail</Typography.Title>
        <Flex gap={10}>
          <Button onClick={handleClickDelete} color="danger" variant="outlined">
            Delete
          </Button>
          <Link to={`/student/${id}/edit`}>
            <Button color="primary" variant="solid">
              Edit
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Row gutter={12}>
        <Col span={24}>
          <Card title={"Student Information"} loading={fetchLoading}>
            <Row gutter={[12, 12]} justify={"space-between"}>
              <Col span={12}>
                <Typography.Title level={5}>Name</Typography.Title>
                <Typography.Text>{student?.name}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>NIS</Typography.Title>
                <Typography.Text>{student?.nis}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Class</Typography.Title>
                <Typography.Text>{student?.claass_name}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Gender</Typography.Title>
                <Typography.Text style={{ textTransform: "capitalize" }}>
                  {student?.gender}
                </Typography.Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

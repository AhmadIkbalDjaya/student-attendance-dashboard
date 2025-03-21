import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Modal,
  Row,
  Typography,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { deleteCourse, getCourse } from "../../services/courseService";
import { showMessage } from "../../utils/messageUtils";

export default function ShowCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const fetchStudent = async () => {
    try {
      setFetchLoading(true);
      const result = await getCourse(id);
      setCourse(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      navigate("/course");
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
      title: <Link to="/course">Course</Link>,
    },
    {
      title: "Detail Course",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Course Detail</Typography.Title>
        <Flex gap={10}>
          <Button onClick={handleClickDelete} color="danger" variant="outlined">
            Delete
          </Button>
          <Link to={`/course/${id}/edit`}>
            <Button color="primary" variant="solid">
              Edit
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Row gutter={12}>
        <Col span={24}>
          <Card title={"Course Information"} loading={fetchLoading}>
            <Row gutter={[12, 12]} justify={"space-between"}>
              <Col span={12}>
                <Typography.Title level={5}>Course Name</Typography.Title>
                <Typography.Text>{course?.name}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Class Name</Typography.Title>
                <Typography.Text>{course?.claass}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Teacher</Typography.Title>
                <Typography.Text>{course?.teacher}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Semester</Typography.Title>
                <Typography.Text>{course?.semester}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Total Student</Typography.Title>
                <Typography.Text>{course?.student_count}</Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Total Attendance</Typography.Title>
                <Typography.Text>{course?.attendance_count}</Typography.Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

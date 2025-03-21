import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Row,
  Table,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { getCourseRecap } from "../../services/recapService";
import { useEffect, useState } from "react";
import { IconPrinter } from "@tabler/icons-react";

export default function ShowRecapPage() {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [recaps, setRecaps] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const fetchRecap = async () => {
    try {
      setFetchLoading(true);
      const result = await getCourseRecap(id);
      setRecaps(result.data.students_recap);
      setCourse(result.data.course);
      setFetchLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchRecap();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NIS",
      dataIndex: "nis",
      key: "nis",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "H",
      dataIndex: "h_count",
      key: "h_count",
    },
    {
      title: "S",
      dataIndex: "s_count",
      key: "s_count",
    },
    {
      title: "I",
      dataIndex: "i_count",
      key: "i_count",
    },
    {
      title: "A",
      dataIndex: "a_count",
      key: "a_count",
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/recap">Recap</Link>,
    },
    {
      title: "Detail Recap",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Recap Detail</Typography.Title>
        <Flex gap={10}>
          <Link to={`/recap`}>
            <Button variant="outlined">Back</Button>
          </Link>
          <Button
            color="primary"
            variant="solid"
            icon={<IconPrinter size={16} />}
          >
            Print
          </Button>
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

      <Table
        columns={columns}
        dataSource={recaps}
        pagination={false}
        rowKey={"id"}
        loading={fetchLoading}
        style={{ marginTop: "25px" }}
      />
    </>
  );
}

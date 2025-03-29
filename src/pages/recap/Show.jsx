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
import { IconPrinter } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useShow } from "./hooks/useShow";

export default function ShowRecapPage() {
  const { breadcrumbItems, course, recaps, fetchLoading, fetchRecap, columns } =
    useShow();

  useEffect(() => {
    fetchRecap();
  }, []);

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
        style={{ marginTop: "25px", marginBottom: "25px" }}
        size="small"
      />
    </>
  );
}

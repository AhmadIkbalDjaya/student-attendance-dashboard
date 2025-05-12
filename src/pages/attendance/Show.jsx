import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Table,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { descriptionsLabelStyle } from "../../values/styles";
import { useShow } from "./hooks/useShow";

export default function ShowAttendancePage() {
  const { id } = useParams();
  const {
    breadcrumbItems,
    fetchAttendance,
    fetchStudentAttendances,
    fetchStatuses,
    statuses,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
    descriptionItemsSummary,
    columns,
    studentAttendances,
  } = useShow();

  useEffect(() => {
    fetchStatuses();
    fetchAttendance();
    fetchStudentAttendances();
  }, []);

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Attendance Detail</Typography.Title>
        <Flex gap={10}>
          <Button onClick={handleClickDelete} color="danger" variant="outlined">
            Delete
          </Button>
          <Link to={`/attendance/${id}/edit`}>
            <Button color="primary" variant="solid">
              Edit
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Row gutter={[12, 10]}>
        <Col xs={24} md={16}>
          <Card title={"Attendance Information"} loading={fetchLoading}>
            <Descriptions
              size="small"
              items={descriptionItems}
              column={2}
              layout="vertical"
              labelStyle={descriptionsLabelStyle}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            title={"Summary"}
            loading={fetchLoading && !statuses.length > 0}
          >
            <Descriptions
              size="small"
              items={descriptionItemsSummary}
              column={2}
              labelStyle={descriptionsLabelStyle}
            />
          </Card>
        </Col>
      </Row>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={studentAttendances}
        rowKey={"id"}
        loading={fetchLoading}
        size="small"
        scroll={{ y: "60vh", x: "max-content" }}
        pagination={false}
      />
    </>
  );
}

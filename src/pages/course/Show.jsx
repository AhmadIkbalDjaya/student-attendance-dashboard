import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useShow } from "./hooks/useShow";

export default function ShowCoursePage() {
  const { id } = useParams();
  const {
    breadcrumbItems,
    fetchStudent,
    course,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
  } = useShow();

  useEffect(() => {
    fetchStudent();
  }, []);

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
            <Descriptions
              size="small"
              items={descriptionItems}
              column={2}
              layout="vertical"
              labelStyle={{
                fontWeight: "500",
                fontSize: "16px",
                color: "black",
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

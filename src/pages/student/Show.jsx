import {
  Breadcrumb,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import ShowAction from "../../components/ShowAction";
import { useShow } from "./hooks/useShow";

export default function ShowStudentPage() {
  const { id } = useParams();
  const {
    breadcrumbItems,
    fetchStudent,
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
        <Typography.Title level={3}>Student Detail</Typography.Title>
        <ShowAction
          handleClickDelete={handleClickDelete}
          editLink={`/student/${id}/edit`}
        />
      </Flex>
      <Row gutter={12}>
        <Col span={24}>
          <Card title={"Student Information"} loading={fetchLoading}>
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

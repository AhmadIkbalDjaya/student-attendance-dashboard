import { Breadcrumb, Card, Col, Flex, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import ShowAction from "../../components/ShowAction";
import { useShow } from "./hooks/useShow";

export default function ShowStudentPage() {
  const { id } = useParams();
  const {
    breadcrumbItems,
    fetchStudent,
    student,
    fetchLoading,
    handleClickDelete,
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

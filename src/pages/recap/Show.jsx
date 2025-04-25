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
import { IconPrinter } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { descriptionsLabelStyle } from "../../values/styles";
import { useShow } from "./hooks/useShow";

export default function ShowRecapPage() {
  const {
    breadcrumbItems,
    recaps,
    fetchLoading,
    fetchRecap,
    columns,
    descriptionItems,
  } = useShow();

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
            <Descriptions
              size="small"
              items={descriptionItems}
              column={2}
              layout="vertical"
              labelStyle={descriptionsLabelStyle}
            />
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

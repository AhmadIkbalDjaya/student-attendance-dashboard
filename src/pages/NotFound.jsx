import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { Button, Col, Result, Row, Space } from "antd";
import Paragraph from "antd/es/skeleton/Paragraph";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", background: "#f5f5f5" }}
    >
      <Col xs={22} sm={20} md={16} lg={12} xl={10}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you are looking for cannot be found or has been
                moved."
          extra={
            <Space direction="vertical" style={{ width: "100%" }}>
              <Paragraph style={{ textAlign: "center" }}>
                Sorry, the page you are looking for cannot be found or has been
                moved.
              </Paragraph>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  type="primary"
                  icon={<IconArrowLeft />}
                  onClick={() => navigate(-1)}
                  size="large"
                  block
                >
                  Go Back to Previous Page
                </Button>
                <Button
                  icon={<IconHome />}
                  onClick={() => navigate("/")}
                  size="large"
                  block
                >
                  Return to Home
                </Button>
              </Space>
            </Space>
          }
        />
      </Col>
    </Row>
  );
}

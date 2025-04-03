import { Card, Col, Flex, Row, Statistic, Typography } from "antd";
import { useEffect } from "react";

import { useDashboard } from "./hooks/useDashboard";

export default function DashboardPage() {
  const { user, fetchData, statisticsData, loadingFetch } = useDashboard();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Typography.Title level={3}>Welcome {user.username}</Typography.Title>
      <Row gutter={[12, 12]}>
        {statisticsData.map((item, index) => (
          <Col xs={24} sm={6} key={`statistic-${index}`}>
            <Card variant="borderless" loading={loadingFetch}>
              <Statistic
                title={
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {item.title}
                  </Typography.Title>
                }
                value={item.value}
                valueStyle={{
                  color: item.color,
                  fontSize: "32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  fontWeight: "500",
                }}
                prefix={<Flex>{item.icon}</Flex>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

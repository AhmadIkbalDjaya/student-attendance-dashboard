import {
  IconBrandDatabricks,
  IconChalkboard,
  IconUserPentagon,
  IconUsers,
} from "@tabler/icons-react";
import { Card, Col, Flex, Row, Statistic, Typography } from "antd";
import { getDashboardData } from "../services/dashboardServive";
import { showMessage } from "../utils/messageUtils";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState();
  const [loadingFetch, setLoadingFetch] = useState(false);

  const fetchData = async () => {
    try {
      setLoadingFetch(true);
      const result = await getDashboardData();
      setData(result.data);
      setLoadingFetch(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statisticsData = [
    {
      title: "Total Students",
      value: data?.student_count,
      icon: <IconUsers size={34} />,
      color: "#4096ff",
    },
    {
      title: "Total Teachers",
      value: data?.teacher_count,
      icon: <IconUserPentagon size={34} />,
      color: "#fadb14",
    },
    {
      title: "Total Classes",
      value: data?.claass_count,
      icon: <IconChalkboard size={34} />,
      color: "#a0d911",
    },
    {
      title: "Total Courses",
      value: data?.course_count,
      icon: <IconBrandDatabricks size={34} />,
      color: "#f5222d",
    },
  ];

  return (
    <>
      <Typography.Title level={3}>Welcome {user.username}</Typography.Title>
      <Row gutter={[12, 12]}>
        {statisticsData.map((item, index) => (
          <Col xs={24} sm={6} key={`statistic-${index}`}>
            <Card variant="borderless" loading={loadingFetch}>
              <Statistic
                title={item.title}
                value={item.value}
                valueStyle={{
                  color: item.color,
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
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

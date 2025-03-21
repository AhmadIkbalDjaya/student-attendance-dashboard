import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import sketch from "../assets/sketch.svg";
import logo from "../assets/react.svg";
import { IconLock, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <Row justify="space-between" align="stretch" style={{ height: "100vh" }}>
      <Col span={12}>
        <Flex
          align="start"
          justify="center"
          vertical
          gap={16}
          style={{ height: "100%", padding: "0px 100px" }}
        >
          <Image src={logo} preview={false} height={"32px"} />
          <Typography.Title level={3}>Log in to become admin</Typography.Title>

          <Form style={{ width: "100%" }}>
            <Form.Item name="username">
              <Input
                size="large"
                placeholder="Username"
                prefix={<IconUser size={20} color="gray" />}
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<IconLock size={20} color="gray" />}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox style={{ color: "#8c8c8c", fontWeight: "semibold" }}>
                Remember me
              </Checkbox>
            </Form.Item>
            <Form.Item name="password">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => navigate("/")}
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
      <Col span={12} style={{ background: "#1890ff" }}>
        <Flex
          align="stretch"
          justify="center"
          vertical
          gap={50}
          style={{ height: "100%", padding: "0px 100px" }}
        >
          <Typography.Title level={1} style={{ color: "#FFFFFF" }}>
            Welcome!
          </Typography.Title>
          <Image src={sketch} preview={false} />
          <Typography.Text
            style={{ color: "#FFFFFF", fontSize: "1.2rem", fontWeight: "500" }}
          >
            Immediately access the admin section to adjust the data and review
            the student attendance recap.
          </Typography.Text>
        </Flex>
      </Col>
    </Row>
  );
}

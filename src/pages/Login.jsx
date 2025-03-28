import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Grid,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import { IconLock, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { showMessage } from "../utils/messageUtils";
import { isAuthenticated, login } from "../services/authService";
import sketch from "../assets/sketch.svg";
import logo from "../assets/react.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const screens = Grid.useBreakpoint();

  const handleSubmit = async () => {
    try {
      setLoadingSubmit(true);
      await login(form.getFieldValue());
      showMessage({ type: "success", content: "Login successfully" });
      navigate("/");
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
      showMessage({ type: "success", content: "You are logged in" });
    }
  }, []);

  return (
    <Row justify="space-between" align="stretch" style={{ height: "100vh" }}>
      <Col xs={24} sm={12}>
        <Flex
          align="start"
          justify="center"
          vertical
          gap={16}
          style={{
            height: "100%",
            padding: screens.xs ? "0px 10px" : "0px 100px",
          }}
        >
          <Image src={logo} preview={false} height={"32px"} />
          <Typography.Title level={3}>Log in to become admin</Typography.Title>

          <Form onFinish={handleSubmit} form={form} style={{ width: "100%" }}>
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
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loadingSubmit}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
      <Col xs={0} sm={12} style={{ background: "#1890ff" }}>
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

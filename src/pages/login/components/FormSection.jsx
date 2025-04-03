import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Grid,
  Image,
  Input,
  Typography,
} from "antd";
import { IconLock, IconUser } from "@tabler/icons-react";

import logo from "../../../assets/logo.png";

export default function FormSection({ form, loadingSubmit, onFinish }) {
  const screens = Grid.useBreakpoint();

  return (
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
        <Flex align="center" gap={10}>
          <Image src={logo} preview={false} height={"32px"} />
          <Typography.Title level={4} style={{ margin: 0 }}>
            Student Attendance MA Pompanua
          </Typography.Title>
        </Flex>
        <Typography.Title level={3}>Log in to become admin</Typography.Title>

        <Form onFinish={onFinish} form={form} style={{ width: "100%" }}>
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
  );
}

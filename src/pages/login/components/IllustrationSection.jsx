import { Col, Flex, Image, Typography } from "antd";

import { primary, white } from "../../../values/colors";
import sketch from "../../../assets/sketch.svg";

export default function IllustrationSection() {
  return (
    <Col xs={0} sm={12} style={{ background: primary }}>
      <Flex
        align="stretch"
        justify="center"
        vertical
        style={{ height: "100%", padding: "0px 100px" }}
      >
        <Typography.Title level={1} style={{ color: white }}>
          Welcome!
        </Typography.Title>
        <Image src={sketch} preview={false} />
        <Typography.Text
          style={{ color: white, fontSize: "1.2rem", fontWeight: "500" }}
        >
          Immediately access the admin section to adjust the data and review the
          student attendance recap.
        </Typography.Text>
      </Flex>
    </Col>
  );
}

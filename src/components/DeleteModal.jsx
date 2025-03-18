import { IconTrash } from "@tabler/icons-react";
import { Flex, Modal, Typography } from "antd";

export default function DeleteModal({
  open,
  onClose,
  onOk,
  record,
  title = "Are you sure delete this data?",
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onClose={onclose}
      centered
      closeIcon={null}
      okType="danger"
      okText="Yes"
      onOk={onOk}
      width={{
        xs: "90%",
        sm: "80%",
        md: "40%",
        lg: "40%",
        xl: "30%",
        xxl: "30%",
      }}
    >
      <Flex vertical align="center" gap={10}>
        <IconTrash size={75} color="red" />
        <Typography.Text style={{ fontSize: "16px", fontWeight: "500" }}>
          {title}
        </Typography.Text>
      </Flex>
    </Modal>
  );
}

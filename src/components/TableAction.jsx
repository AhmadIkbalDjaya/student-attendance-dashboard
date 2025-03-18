import { IconEdit, IconTrash } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";

export default function TableAction({ handleDelete, onClickEdit, editLink }) {
  const editButton = (
    <Button
      type="text"
      icon={<IconEdit color="#f59f00" />}
      onClick={onClickEdit}
    />
  );

  return (
    <Space align="center" size={0}>
      {editLink ? <NavLink to={editLink}>{editButton}</NavLink> : editButton}
      <Button
        type="text"
        icon={<IconTrash color="#d63939" />}
        onClick={handleDelete}
      />
    </Space>
  );
}

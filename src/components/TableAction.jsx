import { IconEdit, IconTrash } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { Button, Popover, Space } from "antd";

export default function TableAction({
  handleDelete,
  onClickEdit,
  editLink,
  children,
}) {
  const editButton = (
    <Button
      type="text"
      icon={<IconEdit color="#f59f00" />}
      onClick={onClickEdit}
    />
  );

  return (
    <Space align="center" size={0}>
      <Popover content="Edit">
        {editLink ? <NavLink to={editLink}>{editButton}</NavLink> : editButton}
      </Popover>
      <Popover content="Delete">
        <Button
          type="text"
          icon={<IconTrash color="#d63939" />}
          onClick={handleDelete}
        />
      </Popover>
      {children}
    </Space>
  );
}

import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { Button, Popover, Space } from "antd";

import { blue, red, yellow } from "../values/colors";

export default function TableAction({
  handleDelete,
  onClickEdit,
  editLink,
  children,
  viewAction = false,
  onClickView,
  viewLink,
  
}) {
  const editButton = (
    <Button
      type="text"
      icon={<IconEdit color={yellow} />}
      onClick={onClickEdit}
    />
  );
  const viewButton = (
    <Button type="text" icon={<IconEye color={blue} />} onClick={onClickView} />
  );

  return (
    <Space align="center" size={0}>
      {viewAction && (
        <Popover content="View">
          {viewLink ? (
            <NavLink to={viewLink}>{viewButton}</NavLink>
          ) : (
            viewButton
          )}
        </Popover>
      )}
      <Popover content="Edit">
        {editLink ? <NavLink to={editLink}>{editButton}</NavLink> : editButton}
      </Popover>
      <Popover content="Delete">
        <Button
          type="text"
          icon={<IconTrash color={red} />}
          onClick={handleDelete}
        />
      </Popover>
      {children}
    </Space>
  );
}

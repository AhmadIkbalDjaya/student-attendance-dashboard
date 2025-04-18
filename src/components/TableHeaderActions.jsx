import { IconPlus } from "@tabler/icons-react";
import { Button, Flex, Input } from "antd";
import { NavLink } from "react-router-dom";

export default function TableHeaderActions({
  handleSearch,
  createLink,
  showCreateButton = true,
}) {
  return (
    <Flex
      justify="space-between"
      align="center"
      gap={10}
      style={{ marginBottom: "10px" }}
    >
      <Input.Search
        placeholder="Search . . ."
        allowClear
        onChange={handleSearch}
        style={{ width: 250 }}
      />
      {showCreateButton && (
        <NavLink to={createLink}>
          <Button type="primary" icon={<IconPlus />}>
            Create
          </Button>
        </NavLink>
      )}
    </Flex>
  );
}

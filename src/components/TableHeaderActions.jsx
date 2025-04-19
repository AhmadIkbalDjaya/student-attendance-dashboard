import { IconChevronDown, IconPlus, IconTrash } from "@tabler/icons-react";
import { Button, Dropdown, Flex, Grid, Input, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { red } from "../values/colors";

export default function TableHeaderActions({
  handleSearch,
  createLink,
  showCreateButton = true,
  showSelectedDropwdown = false,
  handleBulkDelete,
  selectedCount = 0,
}) {
  const screens = Grid.useBreakpoint();
  const items = [
    {
      label: (
        <Typography.Text
          style={{ fontSize: "14px", color: red, fontWeight: 500 }}
        >
          Delete {selectedCount}
        </Typography.Text>
      ),
      icon: <IconTrash size={18} color="red" />,
      key: "0",
      onClick: handleBulkDelete,
    },
  ];
  return (
    <Flex
      justify="space-between"
      gap={10}
      style={{ marginBottom: "10px" }}
      vertical={screens.xs && showSelectedDropwdown}
    >
      <Input.Search
        placeholder="Search . . ."
        allowClear
        onChange={handleSearch}
        style={{ width: screens.xs ? "100%" : 250 }}
      />
      <Flex gap={10} justify="space-between">
        {showSelectedDropwdown && selectedCount > 0 && (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button icon={<IconChevronDown size={18} />} iconPosition="end">
              {selectedCount} Selected
            </Button>
          </Dropdown>
        )}
        {showCreateButton && (
          <NavLink
            to={createLink}
            style={{
              width:
                !showSelectedDropwdown || selectedCount <= 0 ? "100%" : "auto",
            }}
          >
            <Button
              type="primary"
              icon={<IconPlus />}
              style={{ width: "100%" }}
            >
              Create
            </Button>
          </NavLink>
        )}
      </Flex>
    </Flex>
  );
}

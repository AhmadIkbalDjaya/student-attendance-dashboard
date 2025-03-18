import {
  IconCircleCheck,
  IconCircleX,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Button, Flex, Modal, Space, Table, Typography } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function IndexSemesterPage() {
  const [deleteData, setDeleteData] = useState({
    show: false,
    record: null,
  });

  const handleOpenDeleteModal = (record) => {
    setDeleteData({
      show: true,
      record,
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteData({
      show: false,
      record: null,
    });
  };

  const columns = [
    {
      title: "Start Year",
      dataIndex: "start_year",
      key: "start_year",
    },
    {
      title: "End Year",
      dataIndex: "end_year",
      key: "end_year",
    },
    {
      title: "Category",
      dataIndex: "odd_event",
      key: "odd_event",
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      width: 120,
      render: (value) =>
        value ? <IconCircleCheck color="green" /> : <IconCircleX color="red" />,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space align="center" size={0}>
          <NavLink>
            <Button type="text" icon={<IconEdit color="#f59f00" />} />
          </NavLink>
          <Button
            type="text"
            icon={
              <IconTrash
                color="#d63939"
                onClick={() => handleOpenDeleteModal(record)}
              />
            }
          />
        </Space>
      ),
    },
  ];

  const dummyDatas = [
    {
      key: "1",
      start_year: "2022",
      end_year: "2023",
      odd_event: "Genap",
      is_active: 1,
    },
    {
      key: "2",
      start_year: "2022",
      end_year: "2023",
      odd_event: "Genap",
      is_active: 0,
    },
  ];

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <Typography.Title level={3}>Semester</Typography.Title>
        <Flex justify="end" align="center" style={{ marginBottom: "10px" }}>
          <Button type="primary" icon={<IconPlus />}>
            Create
          </Button>
        </Flex>
        <Table columns={columns} dataSource={dummyDatas} pagination={false} />
      </div>

      <Modal
        open={deleteData.show}
        onCancel={handleCloseDeleteModal}
        onClose={handleCloseDeleteModal}
        centered
        closeIcon={null}
        okType="danger"
        okText="Yes"
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
            Are you sure delete this semester?
          </Typography.Text>
        </Flex>
      </Modal>
    </>
  );
}

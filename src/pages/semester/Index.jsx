import {
  IconCircleCheck,
  IconCircleX,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Button, Flex, message, Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { deleteSemester, getAllSemester } from "../../services/semesterService";

export default function IndexSemesterPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = ({ type, content }) => {
    messageApi.open({
      type,
      content,
      style: {
        marginTop: "20px",
      },
    });
  };

  const [semesters, setSemesters] = useState([]);

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

  const fetchData = async () => {
    try {
      const result = await getAllSemester();
      setSemesters(result.data);
    } catch (error) {
      showMessage({ type: "error", content: "Failed Get Data" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSemester(id);
      fetchData();
      handleCloseDeleteModal();
      showMessage({ type: "error", content: "Semester Deleted" });
    } catch (error) {
      showMessage({ type: "error", content: "Failed Semester Deleted" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      dataIndex: "odd_even",
      key: "odd_event",
      render: (value) => (value == 1 ? "Odd" : "Even"),
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

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        {contextHolder}
        <Typography.Title level={3}>Semester</Typography.Title>
        <Flex justify="end" align="center" style={{ marginBottom: "10px" }}>
          <Button type="primary" icon={<IconPlus />}>
            Create
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={semesters}
          pagination={false}
          rowKey={"id"}
        />
      </div>

      <Modal
        open={deleteData.show}
        onCancel={handleCloseDeleteModal}
        onClose={handleCloseDeleteModal}
        centered
        closeIcon={null}
        okType="danger"
        okText="Yes"
        onOk={() => handleDelete(deleteData.record.id)}
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

import { IconCircleCheck, IconCircleX, IconPlus } from "@tabler/icons-react";
import { Button, Flex, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import { deleteSemester, getAllSemester } from "../../services/semesterService";
import DeleteModal from "../../components/DeleteModal";
import TableAction from "../../components/TableAction";
import { showMessage } from "../../utils/messageUtils";

export default function IndexSemesterPage() {
  const [semesters, setSemesters] = useState([]);
  const fetchData = async () => {
    try {
      const result = await getAllSemester();
      setSemesters(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSemester(id);
      fetchData();
      showMessage({ type: "success", content: "Deleted successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      handleCloseDeleteModal();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <TableAction handleDelete={() => handleOpenDeleteModal(record)} />
      ),
    },
  ];

  return (
    <>
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

      <DeleteModal
        open={deleteData.show}
        onClose={handleCloseDeleteModal}
        onOk={() => handleDelete(deleteData.record.id)}
        title="Are you sure delete this data?"
      />
    </>
  );
}

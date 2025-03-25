import { Breadcrumb, Button, Flex, Table, Typography } from "antd";
import { Link, NavLink } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { deleteCourse, getAllCourses } from "../../services/courseService";
import DeleteModal from "../../components/DeleteModal";
import TableAction from "../../components/TableAction";
import { showMessage } from "../../utils/messageUtils";
import { tableHeaderStyle } from "../../utils/tableHeaderStyle";

export default function IndexCoursePage() {
  const [courses, setCourses] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllCourses();
      setCourses(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setGetLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Class",
      dataIndex: "claass",
      key: "claass",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableAction
          editLink={`/course/${record.id}/edit`}
          handleDelete={() => handleOpenDeleteModal(record)}
          viewAction
          viewLink={`/course/${record.id}`}
        ></TableAction>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Course",
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Typography.Title level={3}>Course</Typography.Title>
      <Flex justify="end" align="center" style={{ marginBottom: "10px" }}>
        <NavLink to="/course/create">
          <Button type="primary" icon={<IconPlus />}>
            Create
          </Button>
        </NavLink>
      </Flex>
      <Table
        columns={columns}
        dataSource={courses}
        pagination={false}
        rowKey={"id"}
        loading={getLoading}
        size="small"
        scroll={{ y: "60vh", x: "max-content" }}
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

import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import { Button, Modal, Popover } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import TableAction from "../../../components/TableAction";
import { showMessage } from "../../../utils/messageUtils";
import {
  deleteSemester,
  getAllSemester,
  setActiveSemester,
} from "../../../services/semesterService";

export const useIndex = () => {
  const [semesters, setSemesters] = useState([]);
  const [meta, setMeta] = useState();
  const [getLoading, setGetLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(10);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllSemester(page, perpage);
      setSemesters(result.data);
      setMeta(result.meta);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setGetLoading(false);
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

  const handleSetActiveSemester = (semesterId) => {
    Modal.confirm({
      title: "Are you sure set active this senester?",
      okText: "Yes",
      centered: true,
      onOk: async () => {
        try {
          await setActiveSemester(semesterId);
          fetchData();
          showMessage({ type: "success", content: "Set active successfully" });
        } catch (error) {
          showMessage({ type: "error", content: error.message });
        }
      },
    });
  };

  const columns = [
    {
      title: "Start Year",
      dataIndex: "start_year",
      key: "start_year",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "End Year",
      dataIndex: "end_year",
      key: "end_year",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Category",
      dataIndex: "odd_even",
      key: "odd_event",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
      render: (value) => (value == 1 ? "Odd" : "Even"),
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      width: 100,
      render: (value) =>
        value ? <IconCircleCheck color="green" /> : <IconCircleX color="red" />,
      onHeaderCell: tableHeaderStyle,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableAction
          editLink={`/semester/${record.id}/edit`}
          handleDelete={() => handleOpenDeleteModal(record)}
        >
          {!record.is_active && (
            <Popover content="Set active semester">
              <Button
                onClick={() => handleSetActiveSemester(record.id)}
                type="text"
                icon={<IconCircleCheck color="green" />}
              />
            </Popover>
          )}
        </TableAction>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Semester",
    },
  ];

  return {
    breadcrumbItems,
    semesters,
    getLoading,
    columns,
    fetchData,
    deleteData,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    page,
    setPage,
    meta,
    perpage,
    setPerpage,
  };
};

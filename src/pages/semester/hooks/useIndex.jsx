import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import { Button, Modal, Popover } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  deleteSemester,
  getAllSemester,
  setActiveSemester,
  getSemesterIdsList,
  bulkDeleteSemester,
} from "../../../services/semesterService";
import { useTableRowSelection } from "../../../hooks/useTableRowSelection";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { useTableDelete } from "../../../hooks/useTableDelete";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import TableAction from "../../../components/TableAction";
import { showMessage } from "../../../utils/messageUtils";
import { useSearch } from "../../../hooks/useSearch";

export const useIndex = () => {
  const [semesters, setSemesters] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllSemester(
        pagination.current,
        pagination.pageSize,
        search
      );
      setSemesters(result.data);
      setPagination((prev) => ({
        ...prev,
        total: result.meta?.total_item,
      }));
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setGetLoading(false);
    }
  };

  const { pagination, setPagination, handlePaginationChange } =
    useTablePagination();
  const { search, handleSearch } = useSearch({ pagination, setPagination });

  const {
    deleteData,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
  } = useTableDelete({
    deleteFunction: deleteSemester,
    refreshData: fetchData,
  });

  const { selectedRowKeys, setSelectedRowKeys, rowSelection } =
    useTableRowSelection({ fetchAllKeys: getSemesterIdsList });

  const { handleBulkDelete } = useBulkDelete({
    selectedItems: selectedRowKeys,
    clearSelection: setSelectedRowKeys,
    deleteFuntion: bulkDeleteSemester,
    refreshData: fetchData,
    entityName: "semesters",
  });

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
    pagination,
    handlePaginationChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  };
};

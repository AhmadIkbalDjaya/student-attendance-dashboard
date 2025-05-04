import { Link } from "react-router-dom";
import {
  bulkDeleteAttendance,
  deleteAttendance,
  getAttendanceIdsList,
  getAttendances,
} from "../../../services/attendanceService";
import { showMessage } from "../../../utils/messageUtils";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { useState } from "react";
import { useSearch } from "../../../hooks/useSearch";
import { useTableDelete } from "../../../hooks/useTableDelete";
import { tableHeaderStyle } from "../../../values/styles";
import TableAction from "../../../components/TableAction";
import { useTableRowSelection } from "../../../hooks/useTableRowSelection";
import { useBulkDelete } from "../../../hooks/useBulkDelete";

export const useIndex = () => {
  const [attendances, setAttendances] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const { pagination, setPagination, handlePaginationChange } =
    useTablePagination();
  const { search, handleSearch } = useSearch({ pagination, setPagination });

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAttendances();
      setAttendances(result.data);
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

  const {
    deleteData,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
  } = useTableDelete({
    deleteFunction: deleteAttendance,
    refreshData: fetchData,
  });

  const { selectedRowKeys, setSelectedRowKeys, rowSelection } =
    useTableRowSelection({
      fetchAllKeys: () => getAttendanceIdsList(),
    });

  const { handleBulkDelete } = useBulkDelete({
    selectedItems: selectedRowKeys,
    clearSelection: setSelectedRowKeys,
    deleteFuntion: bulkDeleteAttendance,
    refreshData: fetchData,
    entityName: "attendances",
  });

  const columns = [
    {
      title: "Class",
      dataIndex: "claass",
      key: "claass",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "H",
      dataIndex: "present_count",
      key: "present_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "I",
      dataIndex: "permit_count",
      key: "permit_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "S",
      dataIndex: "sick_count",
      key: "sick_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "A",
      dataIndex: "absent_count",
      key: "absent_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <TableAction
          editAction={false}
          handleDelete={() => handleOpenDeleteModal(record)}
          viewAction
          viewLink={`/attendance/${record.id}`}
        ></TableAction>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Attendance",
    },
  ];

  return {
    breadcrumbItems,
    columns,
    attendances,
    fetchData,
    getLoading,
    handleDelete,
    deleteData,
    handleCloseDeleteModal,
    pagination,
    handlePaginationChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  };
};

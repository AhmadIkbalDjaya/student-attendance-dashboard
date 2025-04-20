import { Link } from "react-router-dom";
import { useState } from "react";

import {
  bulkDeleteStudent,
  deleteStudent,
  getAllStudents,
  getStudentIdsList,
} from "../../../services/studentService";
import { useTableRowSelection } from "../../../hooks/useTableRowSelection";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { useTableDelete } from "../../../hooks/useTableDelete";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";
import { useSearch } from "../../../hooks/useSearch";

export const useIndex = () => {
  const [students, setStudents] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllStudents(
        pagination.current,
        pagination.pageSize,
        search
      );
      setStudents(result.data);
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
    deleteFunction: deleteStudent,
    refreshData: fetchData,
  });

  const { selectedRowKeys, setSelectedRowKeys, rowSelection } =
    useTableRowSelection({ fetchAllKeys: getStudentIdsList });

  const { handleBulkDelete } = useBulkDelete({
    selectedItems: selectedRowKeys,
    clearSelection: setSelectedRowKeys,
    deleteFuntion: bulkDeleteStudent,
    refreshData: fetchData,
    entityName: "students",
  });

  const columns = [
    {
      title: "NIS",
      dataIndex: "nis",
      key: "nis",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
          editLink={`/student/${record.id}/edit`}
          handleDelete={() => handleOpenDeleteModal(record)}
          viewAction
          viewLink={`/student/${record.id}`}
        ></TableAction>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Student",
    },
  ];

  return {
    fetchData,
    getLoading,
    columns,
    students,
    breadcrumbItems,
    deleteData,
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

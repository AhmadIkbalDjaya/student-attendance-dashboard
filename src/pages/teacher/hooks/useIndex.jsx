import { Link } from "react-router-dom";
import { useState } from "react";

import {
  bulkDeleteTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherIdsList,
} from "../../../services/teacherService";
import { useTableRowSelection } from "../../../hooks/useTableRowSelection";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { useTableDelete } from "../../../hooks/useTableDelete";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import { tableHeaderStyle } from "../../../values/styles";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";
import { useSearch } from "../../../hooks/useSearch";

export const useIndex = () => {
  const [teachers, setTeachers] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllTeachers(
        pagination.current,
        pagination.pageSize,
        search
      );
      setTeachers(result.data);
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
    deleteFunction: deleteTeacher,
    refreshData: fetchData,
  });

  const { selectedRowKeys, setSelectedRowKeys, rowSelection } =
    useTableRowSelection({ fetchAllKeys: getTeacherIdsList });

  const { handleBulkDelete } = useBulkDelete({
    selectedItems: selectedRowKeys,
    clearSelection: setSelectedRowKeys,
    deleteFuntion: bulkDeleteTeacher,
    refreshData: fetchData,
    entityName: "teachers",
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
          editLink={`/teacher/${record.id}/edit`}
          handleDelete={() => handleOpenDeleteModal(record)}
          viewAction
          viewLink={`/teacher/${record.id}`}
        ></TableAction>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Teacher",
    },
  ];

  return {
    breadcrumbItems,
    columns,
    teachers,
    fetchData,
    getLoading,
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

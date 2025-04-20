import { Link } from "react-router-dom";
import { useState } from "react";

import {
  bulkDeleteClaass,
  deleteClaass,
  getAllClaasses,
  getClaassIdsList,
} from "../../../services/claassService";
import { useTableRowSelection } from "../../../hooks/useTableRowSelection";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { useTableDelete } from "../../../hooks/useTableDelete";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";
import { useSearch } from "../../../hooks/useSearch";

export const useIndex = () => {
  const [claasses, setClaasses] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllClaasses(
        pagination.current,
        pagination.pageSize,
        search
      );
      setClaasses(result.data);
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
    deleteFunction: deleteClaass,
    refreshData: fetchData,
  });

  const { selectedRowKeys, setSelectedRowKeys, rowSelection } =
    useTableRowSelection({ fetchAllKeys: getClaassIdsList });

  const { handleBulkDelete } = useBulkDelete({
    selectedItems: selectedRowKeys,
    clearSelection: setSelectedRowKeys,
    deleteFuntion: bulkDeleteClaass,
    refreshData: fetchData,
    entityName: "classes",
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
      title: "Level",
      dataIndex: "level",
      key: "level",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
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
          editLink={`/claass/${record.id}/edit`}
          handleDelete={() => handleOpenDeleteModal(record)}
        ></TableAction>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Class",
    },
  ];

  return {
    fetchData,
    breadcrumbItems,
    columns,
    claasses,
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

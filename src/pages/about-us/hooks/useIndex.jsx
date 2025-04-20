import { Link } from "react-router-dom";
import { useState } from "react";

import {
  bulkDeleteAboutUs,
  deleteAboutUs,
  getAboutUsIdsList,
  getAllAboutUs,
} from "../../../services/aboutUsService";
import { useTableRowSelection } from "../../../hooks/useTableRowSelection";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { useTableDelete } from "../../../hooks/useTableDelete";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";
import { useSearch } from "../../../hooks/useSearch";

export const useIndex = () => {
  const [aboutUses, setAboutUses] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllAboutUs(
        pagination.current,
        pagination.pageSize,
        search
      );
      setAboutUses(result.data);
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
    deleteFunction: deleteAboutUs,
    refreshData: fetchData,
  });

  const { selectedRowKeys, setSelectedRowKeys, rowSelection } =
    useTableRowSelection({ fetchAllKeys: getAboutUsIdsList });

  const { handleBulkDelete } = useBulkDelete({
    selectedItems: selectedRowKeys,
    clearSelection: setSelectedRowKeys,
    deleteFuntion: bulkDeleteAboutUs,
    refreshData: fetchData,
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
      title: "Position",
      dataIndex: "position",
      key: "position",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
          editLink={`/about-us/${record.id}/edit`}
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
      title: "About Us",
    },
  ];

  return {
    breadcrumbItems,
    columns,
    aboutUses,
    getLoading,
    fetchData,
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

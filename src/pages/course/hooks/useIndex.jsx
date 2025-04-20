import { Link } from "react-router-dom";
import { useState } from "react";

import { bulkDeleteCourse, deleteCourse, getAllCourses, getCourseIdsList } from "../../../services/courseService";
import { generateRowSelection } from "../../../utils/generateRowSelection";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";
import { debounce } from "../../../utils/debounce";
import { useTablePagination } from "../../../hooks/useTablePagination";
import { useSearch } from "../../../hooks/useSearch";
import { useTableDelete } from "../../../hooks/useTableDelete";
import { useTableRowSelection } from "../../../hooks/useTableRowSelection";

export const useIndex = () => {
  const [courses, setCourses] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllCourses(
        pagination.current,
        pagination.pageSize,
        search
      );
      setCourses(result.data);
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
    deleteFunction: deleteCourse,
    refreshData: fetchData,
  });

  const { selectedRowKeys, setSelectedRowKeys, rowSelection } =
    useTableRowSelection({ fetchAllKeys: getCourseIdsList });

  const { handleBulkDelete } = useBulkDelete({
    selectedItems: selectedRowKeys,
    clearSelection: setSelectedRowKeys,
    deleteFuntion: bulkDeleteCourse,
    refreshData: fetchData,
    entityName: "courses",
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

  return {
    breadcrumbItems,
    columns,
    courses,
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

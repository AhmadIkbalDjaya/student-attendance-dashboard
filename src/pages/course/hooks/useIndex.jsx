import { Link } from "react-router-dom";
import { useState } from "react";

import { bulkDeleteCourse, deleteCourse, getAllCourses, getCourseIdsList } from "../../../services/courseService";
import { generateRowSelection } from "../../../utils/generateRowSelection";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";
import { debounce } from "../../../utils/debounce";

export const useIndex = () => {
  const [courses, setCourses] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  const handleTableChange = (page, pageSize) => {
    if (pageSize != pagination.pageSize) {
      setPagination((prev) => ({
        ...prev,
        current: 1,
        pageSize: pageSize,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        current: page,
      }));
    }
  };

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
    if (pagination.current != 1) {
      setPagination((prev) => ({
        ...prev,
        current: 1,
      }));
    }
  });

  const rowSelection = generateRowSelection({
    selectedRowKeys,
    setSelectedRowKeys,
    fetchAllIds: getCourseIdsList,
  });

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
    handleTableChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  };
};

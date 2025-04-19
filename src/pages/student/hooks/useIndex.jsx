import { Link } from "react-router-dom";
import { useState } from "react";

import {
  bulkDeleteStudent,
  deleteStudent,
  getAllStudents,
  getStudentIdsList,
} from "../../../services/studentService";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";
import { debounce } from "../../../utils/debounce";
import { generateRowSelection } from "../../../utils/generateRowSelection";
import { useBulkDelete } from "../../../hooks/useBulkDelete";

export const useIndex = () => {
  const [students, setStudents] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
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
    fetchAllIds: getStudentIdsList,
  });

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
    handleTableChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  };
};

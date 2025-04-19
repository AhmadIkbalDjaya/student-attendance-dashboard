import { Link } from "react-router-dom";
import { useState } from "react";

import { bulkDeleteClaass, deleteClaass, getAllClaasses, getClaassIdsList } from "../../../services/claassService";
import { generateRowSelection } from "../../../utils/generateRowSelection";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { useBulkDelete } from "../../../hooks/useBulkDelete";
import TableAction from "../../../components/TableAction";
import { showMessage } from "../../../utils/messageUtils";
import { debounce } from "../../../utils/debounce";


export const useIndex = () => {
  const [claasses, setClaasses] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      await deleteClaass(id);
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
    fetchAllIds: getClaassIdsList,
  });

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
    handleTableChange,
    search,
    handleSearch,
    rowSelection,
    handleBulkDelete,
  };
};

import { Link } from "react-router-dom";
import { useState } from "react";

import { deleteAboutUs, getAllAboutUs } from "../../../services/aboutUsService";
import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { showMessage } from "../../../utils/messageUtils";
import TableAction from "../../../components/TableAction";

export const useIndex = () => {
  const [aboutUses, setAboutUses] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllAboutUs();
      setAboutUses(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setGetLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAboutUs(id);
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
  };
};

import { useState } from "react";

import { showMessage } from "../utils/messageUtils";

export const useTableDelete = ({ deleteFunction, refreshData }) => {
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

  const handleDelete = async (id) => {
    try {
      await deleteFunction(id);
      refreshData();
      showMessage({ type: "success", content: "Deleted successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      handleCloseDeleteModal();
    }
  };

  return {
    deleteData,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
  };
};

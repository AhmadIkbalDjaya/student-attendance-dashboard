import { Modal } from "antd";
import { showMessage } from "../utils/messageUtils";

export const useBulkDelete = ({
  selectedItems,
  clearSelection,
  deleteFuntion,
  refreshData,
  entityName = "items",
}) => {
  const handleBulkDelete = () => {
    Modal.confirm({
      title: `Are you sure you want to delete these ${selectedItems.length} ${entityName}?`,
      okText: "Yes",
      okType: "danger",
      centered: true,
      onOk: async () => {
        try {
          await deleteFuntion(selectedItems);
          refreshData();
          showMessage({ type: "success", content: "Deleted successfully" });
          clearSelection([]);
        } catch (error) {
          showMessage({ type: "error", content: error.message });
        }
      },
    });
  };

  return { handleBulkDelete };
};

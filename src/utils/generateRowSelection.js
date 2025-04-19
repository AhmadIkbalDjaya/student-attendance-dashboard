export const generateRowSelection = ({
  selectedRowKeys,
  setSelectedRowKeys,
  fetchAllIds,
}) => {
  return {
    selectedRowKeys,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      if (selected) {
        setSelectedRowKeys([...selectedRowKeys, record.id]);
      } else {
        setSelectedRowKeys(selectedRowKeys.filter((key) => key != record.id));
      }
    },
    onSelectAll: async (selected, selectedRows, changeRows) => {
      const ids = await fetchAllIds();
      if (ids.data.length == selectedRowKeys.length) {
        setSelectedRowKeys([]);
      } else {
        setSelectedRowKeys(ids.data);
      }
    },
  };
};

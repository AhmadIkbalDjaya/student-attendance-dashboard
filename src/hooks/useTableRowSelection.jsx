import { useState } from "react";
import { generateRowSelection } from "../utils/generateRowSelection";

export const useTableRowSelection = ({fetchAllKeys}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = generateRowSelection({
    selectedRowKeys,
    setSelectedRowKeys,
    fetchAllIds: fetchAllKeys,
  });

  return { selectedRowKeys, setSelectedRowKeys, rowSelection };
};

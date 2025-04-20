import { useState } from "react";

export const useTablePagination = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handlePaginationChange = (page, pageSize) => {
    if (pageSize !== pagination.pageSize) {
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

  return { pagination, setPagination, handlePaginationChange };
};

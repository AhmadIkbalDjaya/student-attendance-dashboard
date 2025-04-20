import { useState } from "react";
import { debounce } from "../utils/debounce";

export const useSearch = ({ pagination = null, setPagination = null } = {}) => {
  const [search, setSearch] = useState("");

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);

    if (pagination && setPagination && pagination.current !== 1) {
      setPagination((prev) => ({
        ...prev,
        current: 1,
      }));
    }
  });

  return { search, handleSearch };
};

import { Link, NavLink } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import { Button, Popover } from "antd";
import { useState } from "react";

import { tableHeaderStyle } from "../../../utils/tableHeaderStyle";
import { getAllRecaps } from "../../../services/recapService";
import { showMessage } from "../../../utils/messageUtils";
import { blue } from "../../../values/colors";
import { debounce } from "../../../utils/debounce";

export const useIndex = () => {
  const [recaps, setRecaps] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllRecaps(
        pagination.current,
        pagination.pageSize,
        search
      );
      setRecaps(result.data);
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

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course",
      key: "course",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Class Name",
      dataIndex: "claass",
      key: "claass",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Popover content="View">
          <NavLink to={`/recap/${record.id}`}>
            <Button type="text" icon={<IconEye color={blue} />} />
          </NavLink>
        </Popover>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: "Recap",
    },
  ];

  return {
    breadcrumbItems,
    columns,
    recaps,
    getLoading,
    fetchData,
    pagination,
    handleTableChange,
    search,
    handleSearch,
  };
};

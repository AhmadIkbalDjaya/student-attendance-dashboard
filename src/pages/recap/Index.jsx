import { Breadcrumb, Button, Popover, Table, Typography } from "antd";
import { Link, NavLink } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { getAllRecaps } from "../../services/recapService";
import { showMessage } from "../../utils/messageUtils";

export default function IndexRecapPage() {
  const [recaps, setRecaps] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const fetchData = async () => {
    try {
      setGetLoading(true);
      const result = await getAllRecaps();
      setRecaps(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    } finally {
      setGetLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Class Name",
      dataIndex: "claass",
      key: "claass",
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Popover content="View">
          <NavLink to={`/recap/${record.id}`}>
            <Button type="text" icon={<IconEye color="#4096ff" />} />
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

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Typography.Title level={3}>Recap</Typography.Title>
      <Table
        columns={columns}
        dataSource={recaps}
        pagination={false}
        rowKey={"id"}
        loading={getLoading}
      />
    </>
  );
}

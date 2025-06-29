import { Card, DatePicker, Flex, Grid, Input, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { getAllAttendances } from "../../../services/attendanceService";
import { tableHeaderStyle } from "../../../values/styles";
import { showMessage } from "../../../utils/messageUtils";
import { useSearch } from "../../../hooks/useSearch";
import TableAction from "../../../components/TableAction";

export default function AttendanceOverviewTable() {
  const [data, setData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const screens = Grid.useBreakpoint();

  const [date, setDate] = useState(dayjs(new Date()));
  const { search, handleSearch } = useSearch();

  const fetchData = async () => {
    try {
      setFetchLoading(true);
      const response = await getAllAttendances(
        null,
        null,
        search,
        date ? dayjs(date).format("YYYY-MM-DD") : ""
      );
      setData(response.data);
      setFetchLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.response.data.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, search]);

  const columns = [
    {
      title: "Class",
      dataIndex: "claass",
      key: "claass",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "H",
      dataIndex: "present_count",
      key: "present_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "I",
      dataIndex: "permit_count",
      key: "permit_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "S",
      dataIndex: "sick_count",
      key: "sick_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "A",
      dataIndex: "absent_count",
      key: "absent_count",
      onHeaderCell: tableHeaderStyle,
      width: 10,
    },
    {
      title: "Total",
      dataIndex: "students_count",
      key: "students_count",
      onHeaderCell: tableHeaderStyle,
      width: 50,
      align: "center",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: "View",
      key: "view",
      fixed: "right",
      width: 30,
      render: (_, record) => (
        <TableAction
          viewAction
          viewLink={`/attendance/${record.id}`}
          editAction={false}
          deleteAction={false}
        ></TableAction>
      ),
    },
  ];

  return (
    <Card size="small" style={{ margin: "15px 0" }}>
      <Flex
        justify="space-between"
        align={screens.xs ? "stretch" : "center"}
        vertical={screens.xs}
        style={{ marginBottom: "15px" }}
      >
        <Typography.Title level={4} style={{ textWrap: "nowrap" }}>
          Attendance Overview
        </Typography.Title>
        <Flex align="center" justify="end" gap={10} vertical={screens.xs}>
          <Input.Search
            placeholder="Search..."
            allowClear
            onChange={handleSearch}
          />
          <DatePicker
            format={"DD MMM YYYY "}
            defaultValue={date}
            value={date}
            onChange={(date) => setDate(date)}
            style={{ width: screens.xs ? "100%" : "auto" }}
          />
        </Flex>
      </Flex>
      <Table
        dataSource={data}
        loading={fetchLoading}
        columns={columns}
        rowKey={"id"}
        size="small"
        scroll={{ y: "60vh", x: "max-content" }}
        pagination={false}
      />
    </Card>
  );
}

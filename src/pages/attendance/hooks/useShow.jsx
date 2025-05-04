import { IconCircleCheck, IconPhotoFilled } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "antd";

import {
  deleteAttendance,
  getAttendance,
  getAttendanceStatuses,
} from "../../../services/attendanceService";
import { tableHeaderStyle } from "../../../values/styles";
import { showMessage } from "../../../utils/messageUtils";
import { blue, green } from "../../../values/colors";

export const useShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState();
  const [studentAttendances, setStudentAttendances] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [statuses, setStatuses] = useState([]);

  const fetchAttendance = async () => {
    try {
      setFetchLoading(true);
      const result = await getAttendance(id);
      setAttendance(result.data.attendance);
      setStudentAttendances(result.data.student_attendances);
    } catch (error) {
      showMessage({ type: "error", message: error.response.data.message });
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchStatuses = async () => {
    try {
      const result = await getAttendanceStatuses();
      setStatuses(result.data);
    } catch (error) {
      showMessage({ type: "error", message: error.response.data.message });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendance(id);
      navigate("/attendance");
      showMessage({ type: "success", content: "Deleted successfully" });
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const handleClickDelete = () => {
    Modal.confirm({
      title: "Are you sure delete this data?",
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: () => handleDelete(id),
    });
  };

  const breadcrumbItems = [
    {
      title: <Link to="/">Dashboard</Link>,
    },
    {
      title: <Link to="/attendance">Attendance</Link>,
    },
    {
      title: "Detail Attendance",
    },
  ];

  const descriptionItems = [
    {
      key: "title",
      label: "Title",
      children: attendance?.title,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "datetime",
      label: "Datetime",
      children: `${attendance?.date} - [${attendance?.time}]`,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "course",
      label: "Course",
      children: attendance?.course,
      span: { xs: 1, sm: 1 },
    },
    {
      key: "claass",
      label: "Class",
      children: attendance?.claass,
      span: { xs: 1, sm: 1 },
    },
  ];

  const statusesFields = [
    "present_count",
    "permit_count",
    "sick_count",
    "absent_count",
  ];

  const descriptionItemsSummary = [
    {
      key: "total_student",
      label: "Total Student",
      children: attendance?.students_count,
    },
    ...statuses.map((status) => {
      return {
        key: status.id,
        label: `Total ${status.name}`,
        children: attendance?.[statusesFields[status.id - 1]],
      };
    }),
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "NIS",
      dataIndex: "nis",
      key: "nis",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      onHeaderCell: tableHeaderStyle,
      minWidth: 80,
    },
    {
      title: "H",
      key: "status_id",
      onHeaderCell: tableHeaderStyle,
      width: 35,
      render: (_, record) =>
        record.status_id == 1 && <IconCircleCheck size={18} color={green} />,
    },
    {
      title: "I",
      key: "status_id",
      onHeaderCell: tableHeaderStyle,
      width: 35,
      render: (_, record) =>
        record.status_id == 2 && <IconCircleCheck size={18} color={green} />,
    },
    {
      title: "S",
      key: "status_id",
      onHeaderCell: tableHeaderStyle,
      width: 35,
      render: (_, record) =>
        record.status_id == 3 && <IconCircleCheck size={18} color={green} />,
    },
    {
      title: "A",
      key: "status_id",
      onHeaderCell: tableHeaderStyle,
      width: 35,
      render: (_, record) =>
        record.status_id == 4 && <IconCircleCheck size={18} color={green} />,
    },
    {
      title: "Attachment",
      key: "attachment",
      width: 100,
      align: "center",
      render: (_, record) => {
        record.image && (
          <IconPhotoFilled
            color={blue}
            size={20}
            style={{ cursor: "pointer" }}
          />
        );
      },
    },
  ];

  return {
    breadcrumbItems,
    fetchAttendance,
    fetchStatuses,
    statuses,
    fetchLoading,
    handleClickDelete,
    descriptionItems,
    descriptionItemsSummary,
    columns,
    studentAttendances,
  };
};

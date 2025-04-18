import { useNavigate } from "react-router-dom";
import { Grid, Menu } from "antd";
import {
  IconBatteryAutomotive,
  IconBooks,
  IconBrandDatabricks,
  IconChalkboard,
  IconChartInfographic,
  IconHome,
  IconUserCircle,
  IconUserPentagon,
  IconUsers,
} from "@tabler/icons-react";

import useSidebarStore from "../../store/sidebarStore";
export default function SidebarMenu() {
  const toggle = useSidebarStore((state) => state.toggle);
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();

  const items = [
    {
      key: "1",
      label: "Dashboard",
      icon: <IconHome style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "semester",
      label: "Semester",
      icon: <IconBooks style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/semester");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "claass",
      label: "Class",
      icon: <IconChalkboard style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/claass");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "teacher",
      label: "Teacher",
      icon: <IconUserPentagon style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/teacher");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "student",
      label: "Student",
      icon: <IconUsers style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/student");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "course",
      label: "Course",
      icon: <IconBrandDatabricks style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/course");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "recap",
      label: "Recap",
      icon: <IconChartInfographic style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/recap");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "about-us",
      label: "About Us",
      icon: <IconUserCircle style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/about-us");
        screens.xs ? toggle() : null;
      },
    },
    {
      key: "major",
      label: "Major",
      icon: <IconBatteryAutomotive style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/major");
        screens.xs ? toggle() : null;
      },
    },
  ];

  let selectedKey = [];
  if (location.pathname == "/") {
    selectedKey = ["1"];
  } else if (location.pathname.startsWith("/semester")) {
    selectedKey = ["semester"];
  } else if (location.pathname.startsWith("/claass")) {
    selectedKey = ["claass"];
  } else if (location.pathname.startsWith("/teacher")) {
    selectedKey = ["teacher"];
  } else if (location.pathname.startsWith("/student")) {
    selectedKey = ["student"];
  } else if (location.pathname.startsWith("/course")) {
    selectedKey = ["course"];
  } else if (location.pathname.startsWith("/recap")) {
    selectedKey = ["recap"];
  } else if (location.pathname.startsWith("/about-us")) {
    selectedKey = ["about-us"];
  } else if (location.pathname.startsWith("/major")) {
    selectedKey = ["major"];
  }

  return (
    <Menu
      items={items}
      mode="inline"
      defaultSelectedKeys={["1"]}
      selectedKeys={selectedKey}
    />
  );
}

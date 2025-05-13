import {
  IconBatteryAutomotive,
  IconBooks,
  IconBrandDatabricks,
  IconChalkboard,
  IconChartInfographic,
  IconHome,
  IconNotebook,
  IconSettings,
  IconUserCircle,
  IconUserPentagon,
  IconUsers,
} from "@tabler/icons-react";
import { Button, Flex, Grid, Menu, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import useSidebarStore from "../../store/sidebarStore";
import { primary, white } from "../../values/colors";
import { useEffect, useState } from "react";

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
    {
      key: "attendance",
      label: "Attendance",
      icon: <IconNotebook style={{ marginLeft: -3 }} size={22} />,
      onClick: () => {
        navigate("/attendance");
        screens.xs ? toggle() : null;
      },
    },
  ];

  let selectedKey = [];
  if (location.pathname == "/") {
    selectedKey = ["1"];
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
  } else if (location.pathname.startsWith("/attendance")) {
    selectedKey = ["attendance"];
  }

  return (
    <Flex vertical justify="space-between" style={{ height: "90%" }}>
      <Menu
        items={items}
        mode="inline"
        defaultSelectedKeys={["1"]}
        selectedKeys={selectedKey}
        style={{
          flexGrow: 1,
        }}
      />
      <SemesterMenu />
    </Flex>
  );
}

const SemesterMenu = () => {
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();
  const { collapse, toggle } = useSidebarStore((state) => state);
  const [showTitle, setShowTitle] = useState(!collapse);

  useEffect(() => {
    let timer;
    if (!collapse) {
      timer = setTimeout(() => {
        setShowTitle(true);
      }, 175);
    } else {
      setShowTitle(false);
    }
    return () => clearTimeout(timer);
  }, [collapse]);

  return (
    <Tooltip title={collapse ? "Semester" : ""} placement="right">
      <Flex
        style={{
          background: primary,
          margin: "5px",
          padding: "5px 10px",
          borderRadius: "8px",
          color: white,
        }}
        gap={5}
        align="center"
        justify="center"
      >
        <IconBooks size={22} />
        {(screens.xs ? collapse : !collapse) &&
          (screens.xs ? !showTitle : showTitle) && (
            <>
              <Typography.Text
                style={{ color: white, fontWeight: 700, flexGrow: 1 }}
              >
                Ganjil 2024/2025
              </Typography.Text>
              <Tooltip title="Setting Semester">
                <Button
                  type="text"
                  icon={<IconSettings size={22} color={white} />}
                  onClick={() => {
                    navigate("/semester");
                    screens.xs && toggle();
                  }}
                />
              </Tooltip>
            </>
          )}
      </Flex>
    </Tooltip>
  );
};

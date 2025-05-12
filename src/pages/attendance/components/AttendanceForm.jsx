import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
} from "antd";
import { useEffect, useState } from "react";

import { getAllCourses } from "../../../services/courseService";
import { showMessage } from "../../../utils/messageUtils";

export default function AttendanceForm({
  form,
  handleSubmit,
  type = "store",
  fetchLoading = false,
}) {
  const [courses, setCourses] = useState([]);
  const [fetchCoursesLoading, setFetchCoursesLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setFetchCoursesLoading(true);
      const result = await getAllCourses(1, 100);
      setCourses(result.data);
      setFetchCoursesLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      >
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Input placeholder="Enter title" />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="datetime"
              label="Date and Time"
              rules={[{ required: true, message: "Date and Time is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <DatePicker showTime style={{ width: "100%" }} />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="course_id"
              label="Course"
              rules={[{ required: true, message: "Course is required" }]}
            >
              {fetchLoading || fetchCoursesLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Select
                  options={courses.map((value) => ({
                    value: value.id,
                    label: value.name,
                  }))}
                  placeholder="Select Attendance Course"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={type == "update"}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

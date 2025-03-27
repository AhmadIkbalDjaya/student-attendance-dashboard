import { Card, Col, Form, Input, Row, Select, Skeleton } from "antd";
import { getAllClaasses } from "../../../services/claassService";
import { getAllTeachers } from "../../../services/teacherService";
import { getAllSemester } from "../../../services/semesterService";
import { useEffect, useState } from "react";

export default function CourseForm({
  form,
  handleSubmit,
  fetchLoading = false,
}) {
  const [claasses, setClaasses] = useState([]);
  const [fetchClassesLoading, setFetchClassesLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [fetchTeachersLoading, setFetchTeachersLoading] = useState(false);
  const [semester, setSemester] = useState([]);
  const [fetchSemestersLoading, setFetchSemestersLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      setFetchClassesLoading(true);
      const result = await getAllClaasses();
      setClaasses(result.data);
      setFetchClassesLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const fetchTeachers = async () => {
    try {
      setFetchTeachersLoading(true);
      const result = await getAllTeachers();
      setTeachers(result.data);
      setFetchTeachersLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const fetchSemesters = async () => {
    try {
      setFetchSemestersLoading(true);
      const result = await getAllSemester();
      setSemester(result.data);
      setFetchSemestersLoading(false);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchSemesters();
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
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              {fetchLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Input placeholder="Enter name" />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="claass_id"
              label="Class"
              rules={[{ required: true, message: "Class is required" }]}
            >
              {fetchLoading || fetchClassesLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Select
                  options={claasses.map((value) => ({
                    value: value.id,
                    label: value.name,
                  }))}
                  placeholder="Select Course Class"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="teacher_id"
              label="Teacher"
              rules={[{ required: true, message: "Teacher is required" }]}
            >
              {fetchLoading || fetchTeachersLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Select
                  options={teachers.map((value) => ({
                    value: value.id,
                    label: value.name,
                  }))}
                  placeholder="Select Course Teacher"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="semester_id"
              label="Semester"
              rules={[{ required: true, message: "Semester is required" }]}
            >
              {fetchLoading || fetchSemestersLoading ? (
                <Skeleton.Input block active={fetchLoading} />
              ) : (
                <Select
                  options={semester.map((value) => ({
                    value: value.id,
                    label: `${value.odd_even ? "Odd" : "Even"} ${
                      value.start_year
                    } / ${value.end_year}
                    ${value.is_active ? "(Active)" : ""} `,
                  }))}
                  placeholder="Select Semester"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

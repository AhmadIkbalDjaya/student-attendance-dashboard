import { Card, Col, Form, Input, Row, Select } from "antd";
import { getAllClaasses } from "../../../services/claassService";
import { getAllTeachers } from "../../../services/teacherService";
import { getAllSemester } from "../../../services/semesterService";
import { useEffect, useState } from "react";

export default function CourseForm({ form, handleSubmit }) {
  const [claasses, setClaasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [semester, setSemester] = useState([]);

  const fetchClasses = async () => {
    try {
      const result = await getAllClaasses();
      setClaasses(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const fetchTeachers = async () => {
    try {
      const result = await getAllTeachers();
      setTeachers(result.data);
    } catch (error) {
      showMessage({ type: "error", content: error.message });
    }
  };

  const fetchSemesters = async () => {
    try {
      const result = await getAllSemester();
      setSemester(result.data);
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
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="claass_id"
              label="Class"
              rules={[{ required: true, message: "Class is required" }]}
            >
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
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="teacher_id"
              label="Teacher"
              rules={[{ required: true, message: "Teacher is required" }]}
            >
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
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="semester_id"
              label="Semester"
              rules={[{ required: true, message: "Semester is required" }]}
            >
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
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

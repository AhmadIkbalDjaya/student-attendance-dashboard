import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/dashboard/Dashboard";
import BaseLayout from "./components/layouts/BaseLayout";
import IndexSemesterPage from "./pages/semester/Index";
import CreateSemesterPage from "./pages/semester/Create";
import EditSemesterPage from "./pages/semester/Edit";
import IndexClaassPage from "./pages/claass/Index";
import CreateClaassPage from "./pages/claass/Create";
import EditClaassPage from "./pages/claass/Edit";
import ShowClaassPage from "./pages/claass/Show";
import IndexTeacherPage from "./pages/teacher/Index";
import CreateTeacherPage from "./pages/teacher/Create";
import EditTeacherPage from "./pages/teacher/Edit";
import ShowTeacherPage from "./pages/teacher/Show";
import IndexStudentPage from "./pages/student/Index";
import CreateStudentPage from "./pages/student/Create";
import EditStudentPage from "./pages/student/Edit";
import ShowStudentPage from "./pages/student/Show";
import IndexCoursePage from "./pages/course/Index";
import CreateCoursePage from "./pages/course/Create";
import EditCoursePage from "./pages/course/Edit";
import ShowCoursePage from "./pages/course/Show";
import IndexRecapPage from "./pages/recap/Index";
import ShowRecapPage from "./pages/recap/Show";
import IndexAboutUsPage from "./pages/about-us/Index";
import CreateAboutUsPage from "./pages/about-us/Create";
import EditAboutUsPage from "./pages/about-us/Edit";
import NotFoundPage from "./pages/NotFound";
import LoginPage from "./pages/login/Login";
import { useMessage } from "./utils/messageUtils";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/profile/Index";
import IndexMajorPage from "./pages/major/Index";
import CreateMajorPage from "./pages/major/Create";
import EditMajorPage from "./pages/major/Edit";
import IndexAttendancePage from "./pages/attendance/Index";
import ShowAttendancePage from "./pages/attendance/Show";

function App() {
  const messageContextHolder = useMessage();

  return (
    <BrowserRouter>
      {messageContextHolder}
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BaseLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="semester">
            <Route path="" element={<IndexSemesterPage />} />
            <Route path="create" element={<CreateSemesterPage />} />
            <Route path=":id/edit" element={<EditSemesterPage />} />
          </Route>
          <Route path="claass">
            <Route path="" element={<IndexClaassPage />} />
            <Route path="create" element={<CreateClaassPage />} />
            <Route path=":id/edit" element={<EditClaassPage />} />
            <Route path=":id" element={<ShowClaassPage />} />
          </Route>
          <Route path="teacher">
            <Route path="" element={<IndexTeacherPage />} />
            <Route path="create" element={<CreateTeacherPage />} />
            <Route path=":id/edit" element={<EditTeacherPage />} />
            <Route path=":id" element={<ShowTeacherPage />} />
          </Route>
          <Route path="student">
            <Route path="" element={<IndexStudentPage />} />
            <Route path="create" element={<CreateStudentPage />} />
            <Route path=":id/edit" element={<EditStudentPage />} />
            <Route path=":id" element={<ShowStudentPage />} />
          </Route>
          <Route path="course">
            <Route path="" element={<IndexCoursePage />} />
            <Route path="create" element={<CreateCoursePage />} />
            <Route path=":id/edit" element={<EditCoursePage />} />
            <Route path=":id" element={<ShowCoursePage />} />
          </Route>
          <Route path="recap" element={<IndexRecapPage />} />
          <Route path="recap/:id" element={<ShowRecapPage />} />
          <Route path="about-us">
            <Route path="" element={<IndexAboutUsPage />} />
            <Route path="create" element={<CreateAboutUsPage />} />
            <Route path=":id/edit" element={<EditAboutUsPage />} />
          </Route>
          <Route path="major">
            <Route path="" element={<IndexMajorPage />} />
            <Route path="create" element={<CreateMajorPage />} />
            <Route path=":id/edit" element={<EditMajorPage />} />
          </Route>
          <Route path="attendance" element={<IndexAttendancePage />} />
          <Route path="attendance/:id" element={<ShowAttendancePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

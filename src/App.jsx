import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/Dashboard";
import BaseLayout from "./layouts/BaseLayout";
import IndexSemesterPage from "./pages/semester/Index";
import CreateSemesterPage from "./pages/semester/Create";
import EditSemesterPage from "./pages/semester/Edit";
import IndexClaassPage from "./pages/claass/Index";
import CreateClaassPage from "./pages/claass/Create";
import EditClaassPage from "./pages/claass/Edit";
import IndexTeacherPage from "./pages/teacher/Index";
import CreateTeacherPage from "./pages/teacher/Create";
import EditTeacherPage from "./pages/teacher/Edit";
import ShowTeacherPage from "./pages/teacher/Show";
import IndexStudentPage from "./pages/student/Index";
import CreateStudentPage from "./pages/student/Create";
import EditStudentPage from "./pages/student/Edit";
import ShowStudentPage from "./pages/student/Show";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="semester">
            <Route path="" element={<IndexSemesterPage />} />
            <Route path="create" element={<CreateSemesterPage />} />
            <Route path=":id/edit" element={<EditSemesterPage />} />
          </Route>
          <Route path="claass">
            <Route path="" element={<IndexClaassPage />} />
            <Route path="create" element={<CreateClaassPage />} />
            <Route path=":id/edit" element={<EditClaassPage />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

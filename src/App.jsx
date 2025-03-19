import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/Dashboard";
import BaseLayout from "./layouts/BaseLayout";
import IndexSemesterPage from "./pages/semester/Index";
import CreateSemesterPage from "./pages/semester/Create";
import EditSemesterPage from "./pages/semester/Edit";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

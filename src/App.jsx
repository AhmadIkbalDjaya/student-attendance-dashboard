import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import BaseLayout from "./layouts/Base";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

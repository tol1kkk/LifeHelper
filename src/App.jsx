import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import TasksPage from "./pages/TasksPage/TasksPage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
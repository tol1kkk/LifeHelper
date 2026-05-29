import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import TasksPage from "./pages/TasksPage/TasksPage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import GoalsPage from "./pages/GoalsPage/GoalsPage";
import NotesPage from "./pages/NotesPage/NotesPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

export default function App() {
  return (

    // ПЕРЕХІД МІЖ СТОРІНКАМИ 

    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


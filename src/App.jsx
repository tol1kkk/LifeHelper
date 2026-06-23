import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import TasksPage from "./pages/TasksPage/TasksPage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import GoalsPage from "./pages/GoalsPage/GoalsPage";
import NotesPage from "./pages/NotesPage/NotesPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BottomNav from "./components/BottomNav/BottomNav.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem("lifeHelperProfile");

    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return {
      avatar: "",
      name: "",
      username: "",
      birthDate: "",
      bio: "",
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("lifeHelperProfile", JSON.stringify(profileData));
    } catch (error) {
      console.log("Profile storage is full:", error);
    }
  }, [profileData]);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<HomePage tasks={tasks} profileData={profileData} />}
          />

          <Route
            path="/tasks"
            element={<TasksPage tasks={tasks} setTasks={setTasks} />}
          />

          <Route path="/budget" element={<BudgetPage />} />

          <Route path="/goals" element={<GoalsPage />} />

          <Route path="/notes" element={<NotesPage />} />
          <Route path="/statistics" element={<StatisticsPage tasks={tasks} />} />
          <Route path="/profile" element={<ProfilePage profileData={profileData} setProfileData={setProfileData} />} />
        </Routes>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
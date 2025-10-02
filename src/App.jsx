import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import FocusTimerPage from "./pages/FocusTimerPage";
import TaskFormPage from "./pages/TaskFormPage"; 
import "./styles.css";
import PendingTasksPage from "./pages/PendingTasksPage";
import OverdueTasksPage from "./pages/OverdueTasksPage";
import CompletedTasksPage from "./pages/CompletedTasksPage";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/timer" element={<FocusTimerPage />} />
          <Route path="/add-task/:subject" element={<TaskFormPage />} /> 
          <Route path="/tasks/pending" element={<PendingTasksPage />} />
          <Route path="/tasks/overdue" element={<OverdueTasksPage />} />
         <Route path="/tasks/completed" element={<CompletedTasksPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

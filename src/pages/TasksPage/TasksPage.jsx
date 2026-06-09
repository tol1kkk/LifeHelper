import { useState } from "react";
import "./TasksPage.css";

const initialTasks = [
  {
    id: 1,
    title: "Finish React project",
    description: "Create all pages and components",
    completed: false,
    priority: "High",
    category: "Work",
  },
  {
    id: 2,
    title: "Study for exam",
    description: "Math and Frontend",
    completed: false,
    priority: "Medium",
    category: "Study",
  },
  {
    id: 3,
    title: "Gym workout",
    description: "Leg day",
    completed: false,
    priority: "Low",
    category: "Health",
  },
  {
    id: 4,
    title: "Read a book",
    description: "Atomic Habits",
    completed: false,
    priority: "Low",
    category: "Self",
  },
  {
    id: 5,
    title: "Learn Next.js",
    description: "Watch tutorials and practice",
    completed: false,
    priority: "Medium",
    category: "Work",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");

  // СОРТУВАННЯ РІВЕНЬ СЛАДНОСТІ ЗАВДАННЯ ТА ТАКОЖ COMPLETED ACTIVE

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Active") return !task.completed;
      if (filter === "Completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (filter === "All") {
        if (a.completed !== b.completed) {
          return a.completed - b.completed;
        }
      }

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <main className="tasksPage">
      <header className="tasksHeader">
        <div className="tasksLogo">
          <p>LifeHelper</p>
        </div>

        <button className="tasksMenu">•••</button>
      </header>

      <section className="tasksTop">
        <h1>My Tasks</h1>
        <button className="addTaskButton">+ New Task</button>
      </section>

      <section className="tasksFilters">
        {["All", "Active", "Completed"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={filter === item ? "filterActive" : "filterButton"}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="tasksList">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={task.completed ? "taskCard completedCard" : "taskCard"}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "taskCheck activeCheck" : "taskCheck"}
            >
              {task.completed ? "✓" : ""}
            </button>

            <div className="taskContent">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <div className="taskTags">
              <span className={`priorityTag ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`categoryTag ${task.category.toLowerCase()}`}>
                {task.category}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

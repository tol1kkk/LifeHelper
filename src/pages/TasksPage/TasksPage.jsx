import { useState } from "react";
import "./TasksPage.css";

const levelImage = {
  High: "/hard.png",
  Medium: "/medium.png",
  Low: "/low.png",
};

const levelTopic = {
  Work: "#Work",
  Self: "#Self",
  Health: "#Health",
  Study: "#Study",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // МОДАЛЬНЕ ВІКНО ДОДАВАННЯ ЗАВДАННЯ

  const [isModalOpen, setIsModalOpen] = useState(false);

  // МАКЕТ ДЛЯ БЛОКУ ЗАВДАННЯ

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Work",
  });

  // ФУНКЦІЯ ДЛЯ ДОДАВАННЯ ЗАВДАННЯ / МОДАЛЬНЕ ВІКНО

  function addNewTask() {
    if (newTask.title.trim() === "") {
      return;
    }

    const taskToAdd = {
      // СТВОРЕННЯ УНІКАЛЬНОГО ID
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      category: newTask.category,
    };

    setTasks([taskToAdd, ...tasks]);

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      category: "Work",
    });

    setIsModalOpen(false);
  }

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
          <p className="tasksLogoText">LifeHelper</p>
        </div>

        <button className="tasksMenu">•••</button>
      </header>

      <section className="tasksTop">
        <h1 className="tasksTitle">My Tasks</h1>
        <button onClick={() => setIsModalOpen(true)} className="addTaskButton">
          + New Task
        </button>
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
              <h3 className="taskTitle">{task.title}</h3>
              <p className="taskDescription">{task.description}</p>
            </div>

            <div className="taskTags">
              <img
                className="priorityImage"
                src={levelImage[task.priority]}
                alt={task.priority}
              />

              <span className={`categoryTag ${task.category.toLowerCase()}`}>
                {levelTopic[task.category]}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* МОДАЛЬНЕ ВІКНО */}

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="taskModal">
            <div className="modalHeader">
              <div className="titleBlock">
                <h2 className="modalTitle">Create New Task</h2>
                <p className="modalSubtitle">
                  Add a task with priority and category
                </p>
              </div>

              <button
                className="modalCloseButton"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="modalForm">
              <div className="modalField">
                <label className="modalLabel">Task title</label>
                <input
                  className="modalInput"
                  type="text"
                  placeholder="Example: Finish React project"
                  value={newTask.title}
                  onChange={(event) =>
                    setNewTask({ ...newTask, title: event.target.value })
                  }
                />
              </div>

              <div className="modalField">
                <label className="modalLabel">Description</label>
                <textarea
                  className="modalTextarea"
                  placeholder="Example: Create all pages and components"
                  value={newTask.description}
                  onChange={(event) =>
                    setNewTask({ ...newTask, description: event.target.value })
                  }
                />
              </div>

              <div className="modalField">
                <label className="modalLabel">Priority</label>

                <div className="priorityOptions">
                  <button
                    type="button"
                    className={
                      newTask.priority === "High"
                        ? "priorityOption priorityOptionActive"
                        : "priorityOption"
                    }
                    onClick={() => setNewTask({ ...newTask, priority: "High" })}
                  >
                    <img
                      src="/hard.png"
                      alt="High"
                      className="priorityOptionIcon"
                    />
                    <span>High</span>
                  </button>

                  <button
                    type="button"
                    className={
                      newTask.priority === "Medium"
                        ? "priorityOption priorityOptionActive"
                        : "priorityOption"
                    }
                    onClick={() =>
                      setNewTask({ ...newTask, priority: "Medium" })
                    }
                  >
                    <img
                      src="/medium.png"
                      alt="Medium"
                      className="priorityOptionIcon"
                    />
                    <span>Medium</span>
                  </button>

                  <button
                    type="button"
                    className={
                      newTask.priority === "Low"
                        ? "priorityOption priorityOptionActive"
                        : "priorityOption"
                    }
                    onClick={() => setNewTask({ ...newTask, priority: "Low" })}
                  >
                    <img
                      src="/low.png"
                      alt="Low"
                      className="priorityOptionIcon"
                    />
                    <span>Low</span>
                  </button>
                </div>
              </div>

              <div className="modalField">
                <label className="modalLabel">Category</label>

                <div className="selectBox">
                  <select
                    className="modalSelect"
                    value={newTask.category}
                    onChange={(event) =>
                      setNewTask({ ...newTask, category: event.target.value })
                    }
                  >
                    <option value="Work">#Work</option>
                    <option value="Study">#Study</option>
                    <option value="Health">#Health</option>
                    <option value="Self">#Self</option>
                  </select>

                  <span className="selectArrow">⌄</span>
                </div>
              </div>

              <div className="modalActions">
                <button
                  className="modalCancelButton"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button className="modalAddButton" onClick={addNewTask}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

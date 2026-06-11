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

export default function TasksPage({ tasks, setTasks }) {
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Work",
    date: "Today",
  });

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

  function addNewTask() {
    if (newTask.title.trim() === "") {
      return;
    }

    const taskToAdd = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      category: newTask.category,
      date: newTask.date,
    };

    setTasks([taskToAdd, ...tasks]);

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      category: "Work",
      date: "Today",
    });

    setIsModalOpen(false);
    setIsCategoryOpen(false);
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
        <div>
          <h1 className="tasksTitle">My Tasks</h1>
        </div>

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
        {filteredTasks.length === 0 ? (
          <div className="emptyTasks">
            <h3 className="emptyTasksTitle">No tasks yet</h3>
            <p className="emptyTasksText">
              Create your first task to get started.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={task.completed ? "taskCard completedCard" : "taskCard"}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={
                  task.completed ? "taskCheck activeCheck" : "taskCheck"
                }
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

                <span className="taskDueDate">{task.date}</span>
              </div>
            </div>
          ))
        )}
      </section>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="taskModal">
            <div className="modalHeader">
              <div className="titleBlock">
                <h2 className="modalTitle">Create New Task</h2>
                <p className="modalSubtitle">
                  Add title, priority, category and due date
                </p>
              </div>

              <button
                className="modalCloseButton"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsCategoryOpen(false);
                }}
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
                <label className="modalLabel">Due date</label>

                <div className="dateOptions">
                  {["Today", "Tomorrow", "This week"].map((date) => (
                    <button
                      key={date}
                      type="button"
                      className={
                        newTask.date === date
                          ? "dateOption dateOptionActive"
                          : "dateOption"
                      }
                      onClick={() => setNewTask({ ...newTask, date })}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modalField">
                <label className="modalLabel">Priority</label>

                <div className="priorityOptions">
                  {["High", "Medium", "Low"].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      className={
                        newTask.priority === priority
                          ? "priorityOption priorityOptionActive"
                          : "priorityOption"
                      }
                      onClick={() => setNewTask({ ...newTask, priority })}
                    >
                      <img
                        src={levelImage[priority]}
                        alt={priority}
                        className="priorityOptionIcon"
                      />
                      <span>{priority}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="modalField">
                <label className="modalLabel">Category</label>

                <div className="customSelect">
                  <button
                    type="button"
                    className={
                      isCategoryOpen
                        ? "customSelectButton selectOpen"
                        : "customSelectButton"
                    }
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <span>{levelTopic[newTask.category]}</span>
                    <span className="customArrow">⌄</span>
                  </button>

                  {isCategoryOpen && (
                    <div className="customOptions customOptionsUp">
                      {["Work", "Study", "Health", "Self"].map((category) => (
                        <button
                          key={category}
                          type="button"
                          className={
                            newTask.category === category
                              ? "customOption customOptionActive"
                              : "customOption"
                          }
                          onClick={() => {
                            setNewTask({ ...newTask, category });
                            setIsCategoryOpen(false);
                          }}
                        >
                          {levelTopic[category]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="modalActions">
                <button
                  className="modalCancelButton"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsCategoryOpen(false);
                  }}
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

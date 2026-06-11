import { NavLink } from "react-router-dom";
import "./HomePage.css";

export default function HomePage({ tasks }) {
  const homeTasks = tasks.slice(0, 4);
  return (
    <main className="homePage">
      <header className="homeHeader">
        <div className="headerText">
          <h2 className="greeting">Good evening,</h2>
          <h1 className="userName">Anatolii 👋</h1>
          <p className="subtitle">Here's your summary for today</p>
        </div>

        <div className="headerActions">
          <a href="/profile">
            <button className="avatarButton">
              <img src="./userGrey.png" alt="User avatar" />
            </button>
          </a>

          <button className="notificationButton">
            <img src="./bell.png" alt="Notifications" />
          </button>
        </div>
      </header>

      <section className="dailySummary card">
        <div className="sectionHeader">
          <h3>Daily Summary</h3>
          <span>›</span>
        </div>

        <div className="summaryContent">
          <div className="progressCircle">
            {/* <div>
              <strong>70%</strong>
              <p>Progress</p>
            </div> */}
          </div>

          <div className="summaryList">
            <div className="summaryItem">
              {/* <span className="summaryIcon purple">✓</span>
              <p>Tasks Completed</p>
              <strong>7 / 10</strong> */}
            </div>

            <div className="summaryItem">
              {/* <span className="summaryIcon green">💳</span>
              <p>Current Balance</p>
              <strong className="greenText">£2,430</strong> */}
            </div>

            <div className="summaryItem">
              {/* <span className="summaryIcon orange">◎</span>
              <p>Goal Progress</p>
              <strong className="orangeText">65%</strong> */}
            </div>
          </div>
        </div>
      </section>

      <section className="quickAccess">
        <h3 className="sectionTitle">Quick Access</h3>

        <div className="quickGrid">
          <NavLink to="/tasks">
            <div className="quickCard card">
              <span className="quickIcon purple">
                <img src="/check.png" alt="" className="icons_home" />
              </span>
              <div className="quickContent">
                <h4 className="quickTitle">Tasks</h4>
                <p className="quickText">Manage your tasks</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/budget">
            <div className="quickCard card">
              <span className="quickIcon green">
                <img src="/wallet.png" alt="" className="icons_home" />
              </span>
              <div className="quickContent">
                <h4 className="quickTitle">Budget</h4>
                <p className="quickText">Track income & expenses</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/goals">
            <div className="quickCard card">
              <span className="quickIcon orange">
                <img src="/target.png" alt="" className="icons_home" />
              </span>
              <div className="quickContent">
                <h4 className="quickTitle">Goals</h4>
                <p className="quickText">Track your savings goals</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/notes">
            <div className="quickCard card">
              <span className="quickIcon blue">
                <img src="/wirte.png" alt="" className="icons_home" />
              </span>
              <div className="quickContent">
                <h4 className="quickTitle">Notes</h4>
                <p className="quickText">Your notes and ideas</p>
              </div>
            </div>
          </NavLink>
        </div>
      </section>

      <section className="todayTasks">
        <div className="sectionHeader">
          <h3 className="sectionTitle">Today's Tasks</h3>
          <NavLink to="/tasks">View all</NavLink>
        </div>

        <div className="homeTaskList card">
          {homeTasks.length === 0 ? (
            <div className="homeEmptyTasks">
              <p className="homeEmptyTitle">No tasks yet</p>
              <span className="homeEmptyText">
                Add your first task from Tasks page
              </span>
            </div>
          ) : (
            homeTasks.map((task) => (
              <div className="homeTaskItem" key={task.id}>
                <span
                  className={task.completed ? "homeCheckedBox" : "homeEmptyBox"}
                >
                  {task.completed ? "✓" : ""}
                </span>

                <p
                  className={
                    task.completed
                      ? "homeTaskName homeTaskDone"
                      : "homeTaskName"
                  }
                >
                  {task.title}
                </p>

                <span className={`homeTaskTag ${task.category.toLowerCase()}`}>
                  #{task.category}
                </span>

                <span className="homeTaskDate">{task.date}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="weeklyProgress card">
        <div className="sectionHeader">
          <h3>Weekly Progress</h3>
          <a href="/statistics">View stats</a>
        </div>
      </section>
    </main>
  );
}

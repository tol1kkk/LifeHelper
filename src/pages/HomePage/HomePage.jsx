import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";

function getLocalStorageData(key) {
  try {
    const savedData = localStorage.getItem(key);

    if (savedData) {
      return JSON.parse(savedData);
    }

    return [];
  } catch (error) {
    console.log(`Could not load ${key}:`, error);
    return [];
  }
}

function formatMoney(value) {
  return Number(value).toLocaleString("en-GB");
}

function getAverageGoalProgress(goals) {
  if (goals.length === 0) {
    return 0;
  }

  const totalProgress = goals.reduce((sum, goal) => {
    if (!goal.targetAmount || goal.targetAmount <= 0) {
      return sum;
    }

    const progress = Math.min(
      Math.round((goal.currentAmount / goal.targetAmount) * 100),
      100,
    );

    return sum + progress;
  }, 0);

  return Math.round(totalProgress / goals.length);
}

export default function HomePage({ tasks = [], profileData }) {
  const [budgetData, setBudgetData] = useState([]);
  const [goalsData, setGoalsData] = useState([]);

  useEffect(() => {
    setBudgetData(getLocalStorageData("lifeHelperBudget"));
    setGoalsData(getLocalStorageData("lifeHelperGoals"));
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const taskProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const income = budgetData
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = budgetData
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expenses;

  const goalProgress = getAverageGoalProgress(goalsData);

  const todayTasks = tasks.slice(0, 3);

  const userName = profileData?.name || "User";
  const avatar = profileData?.avatar || "/userGrey.png";

  return (
    <main className="homePage">
      <header className="homeHeader">
        <div className="homeHeaderText">
          <h2 className="homeGreeting">Good evening,</h2>
          <h1 className="homeUserName">{userName} 👋</h1>
          <p className="homeSubtitle">Here's your summary for today</p>
        </div>

        <div className="homeHeaderActions">
          <NavLink to="/profile" className="homeAvatarLink">
            <button className="homeAvatarButton">
              <img src={avatar} alt="User avatar" />
            </button>
          </NavLink>

          <button className="homeNotificationButton">
            <img src="/bell.png" alt="Notifications" />
            <span></span>
          </button>
        </div>
      </header>

      <section className="homeDailySummary">
        <div className="homeSectionHeader">
          <h3 className="homeSectionTitle">Daily Summary</h3>
          <NavLink to="/statistics">View stats</NavLink>
        </div>

        <div className="homeSummaryContent">
          <div
            className="homeProgressCircle"
            style={{
              background: `
                radial-gradient(circle at center, #15161c 58%, transparent 59%),
                conic-gradient(
                  var(--accent-purple) 0% ${taskProgress}%,
                  rgba(255,255,255,0.08) ${taskProgress}% 100%
                )
              `,
            }}
          >
            <div>
              <strong>{taskProgress}%</strong>
              <p>Progress</p>
            </div>
          </div>

          <div className="homeSummaryList">
            <div className="homeSummaryItem">
              <span className="homeSummaryIcon homePurpleIcon">✓</span>
              <p>Tasks Completed</p>
              <strong>
                {completedTasks} / {totalTasks}
              </strong>
            </div>

            <div className="homeSummaryItem">
              <span className="homeSummaryIcon homeGreenIcon">£</span>
              <p>Current Balance</p>
              <strong className="homeGreenText">
                £{formatMoney(balance)}
              </strong>
            </div>

            <div className="homeSummaryItem">
              <span className="homeSummaryIcon homeOrangeIcon">◎</span>
              <p>Goal Progress</p>
              <strong className="homeOrangeText">{goalProgress}%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="homeQuickAccess">
        <h3 className="homeSectionTitle">Quick Access</h3>

        <div className="homeQuickGrid">
          <NavLink to="/tasks" className="homeQuickLink">
            <div className="homeQuickCard">
              <span className="homeQuickIcon homePurpleIcon">
                <img src="/check.png" alt="" />
              </span>

              <div className="homeQuickContent">
                <h4>Tasks</h4>
                <p>Manage your tasks</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/budget" className="homeQuickLink">
            <div className="homeQuickCard">
              <span className="homeQuickIcon homeGreenIcon">
                <img src="/wallet.png" alt="" />
              </span>

              <div className="homeQuickContent">
                <h4>Budget</h4>
                <p>Track income & expenses</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/goals" className="homeQuickLink">
            <div className="homeQuickCard">
              <span className="homeQuickIcon homeOrangeIcon">
                <img src="/target.png" alt="" />
              </span>

              <div className="homeQuickContent">
                <h4>Goals</h4>
                <p>Track your savings goals</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/notes" className="homeQuickLink">
            <div className="homeQuickCard">
              <span className="homeQuickIcon homeBlueIcon">
                <img src="/wirte.png" alt="" />
              </span>

              <div className="homeQuickContent">
                <h4>Notes</h4>
                <p>Your notes and ideas</p>
              </div>
            </div>
          </NavLink>
        </div>
      </section>

      <section className="homeTodayTasks">
        <div className="homeSectionHeader">
          <h3 className="homeSectionTitle">Today's Tasks</h3>
          <NavLink to="/tasks">View all</NavLink>
        </div>

        <div className="homeTaskList">
          {todayTasks.length === 0 ? (
            <div className="homeEmptyTasks">
              <h3>No tasks yet</h3>
              <p>Add your first task to see it here.</p>
            </div>
          ) : (
            todayTasks.map((task) => (
              <div className="homeTaskItem" key={task.id}>
                <span
                  className={task.completed ? "homeCheckedBox" : "homeEmptyBox"}
                >
                  {task.completed ? "✓" : ""}
                </span>

                <p className={task.completed ? "homeTaskDone" : ""}>
                  {task.title}
                </p>

                <span className={`homeTaskTag ${task.category.toLowerCase()}`}>
                  #{task.category}
                </span>

                <span className="homeTaskDate">
                  {task.dueDate || task.date || "Today"}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="homeWeeklyProgress">
        <div className="homeSectionHeader">
          <h3 className="homeSectionTitle">Weekly Progress</h3>
          <NavLink to="/statistics">View stats</NavLink>
        </div>

        <div className="homeMiniChart">
          {[35, 55, 45, 70, 80, 50, 40].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }}></span>
          ))}
        </div>
      </section>
    </main>
  );
}
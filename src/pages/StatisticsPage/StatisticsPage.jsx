import { useEffect, useState } from "react";
import "./StatisticsPage.css";

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

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getSavedTaskHistory() {
  try {
    const savedHistory = localStorage.getItem("lifeHelperTaskHistory");

    if (savedHistory) {
      return JSON.parse(savedHistory);
    }

    return [];
  } catch (error) {
    console.log("Could not load task history:", error);
    return [];
  }
}

function saveTodayTaskStats(completedTasks, totalTasks, completionRate) {
  const today = getTodayKey();
  const savedHistory = getSavedTaskHistory();

  const filteredHistory = savedHistory.filter((item) => item.date !== today);

  const updatedHistory = [
    ...filteredHistory,
    {
      date: today,
      completedTasks,
      totalTasks,
      completionRate,
    },
  ];

  const lastSevenRecords = updatedHistory.slice(-7);

  localStorage.setItem(
    "lifeHelperTaskHistory",
    JSON.stringify(lastSevenRecords),
  );

  return lastSevenRecords;
}

function formatChartDay(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
  });
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

export default function StatisticsPage({ tasks = [] }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Week");
  const [budgetData, setBudgetData] = useState([]);
  const [goalsData, setGoalsData] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);

  useEffect(() => {
    setBudgetData(getLocalStorageData("lifeHelperBudget"));
    setGoalsData(getLocalStorageData("lifeHelperGoals"));
    setTaskHistory(getSavedTaskHistory());
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  useEffect(() => {
    const updatedHistory = saveTodayTaskStats(
      completedTasks,
      totalTasks,
      completionRate,
    );

    setTaskHistory(updatedHistory);
  }, [completedTasks, totalTasks, completionRate]);

  const income = budgetData
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = budgetData
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expenses;

  const goalsProgress = getAverageGoalProgress(goalsData);

  const activeGoals = goalsData.filter(
    (goal) => goal.currentAmount < goal.targetAmount,
  ).length;

  const completedGoals = goalsData.filter(
    (goal) => goal.currentAmount >= goal.targetAmount,
  ).length;

  const taskChartData =
    taskHistory.length > 0
      ? taskHistory.map((item) => ({
          label: formatChartDay(item.date),
          value: item.completionRate,
          completedTasks: item.completedTasks,
          totalTasks: item.totalTasks,
          date: item.date,
        }))
      : [
          {
            label: "Today",
            value: completionRate,
            completedTasks,
            totalTasks,
            date: getTodayKey(),
          },
        ];

  const chartWidth = 320;
  const chartHeight = 140;
  const chartPadding = 18;
  const maxChartValue = 100;

  const chartPoints = taskChartData.map((item, index) => {
    const x =
      taskChartData.length === 1
        ? chartWidth / 2
        : chartPadding +
          (index * (chartWidth - chartPadding * 2)) /
            (taskChartData.length - 1);

    const y =
      chartHeight -
      chartPadding -
      (item.value / maxChartValue) * (chartHeight - chartPadding * 2);

    return { ...item, x, y };
  });

  const linePath = chartPoints
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");

  const areaPath =
    chartPoints.length > 1
      ? `
        ${linePath}
        L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - chartPadding}
        L ${chartPoints[0].x} ${chartHeight - chartPadding}
        Z
      `
      : "";

  const recentBudgetItems = budgetData.slice(0, 3);
  const recentGoals = goalsData.slice(0, 2);

  return (
    <main className="statisticsPage">
      <header className="statisticsHeader">
        <div className="statisticsLogo">
          <span>✓</span>
          <p className="statisticsLogoText">LifeHelper</p>
        </div>
      </header>

      <section className="statisticsTop">
        <div className="statisticsTopText">
          <h1 className="statisticsTitle">Statistics</h1>
          <p className="statisticsSubtitle">
            Track your progress across the whole app
          </p>
        </div>
      </section>

      <section className="periodTabs">
        {["Day", "Week", "Month", "Year"].map((period) => (
          <button
            key={period}
            className={
              selectedPeriod === period
                ? "periodTab activePeriodTab"
                : "periodTab"
            }
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </button>
        ))}
      </section>

      <section className="statsGrid">
        <article className="statCard greenStat">
          <div className="statContent">
            <p className="statLabel">Tasks Completed</p>
            <h2 className="statValue">{completedTasks}</h2>
            <span className="statSmallText">{totalTasks} total tasks</span>
          </div>

          <div className="statIconBox">✓</div>
        </article>

        <article className="statCard purpleStat">
          <div className="statContent">
            <p className="statLabel">Completion Rate</p>
            <h2 className="statValue">{completionRate}%</h2>
            <span className="statSmallText">{selectedPeriod} overview</span>
          </div>

          <div className="circleProgress">
            <span>{completionRate}%</span>
          </div>
        </article>

        <article className="statCard blueStat">
          <div className="statContent">
            <p className="statLabel">Current Balance</p>
            <h2 className="statValue">£{formatMoney(balance)}</h2>
            <span className="statSmallText">Income £{formatMoney(income)}</span>
          </div>

          <div className="statIconBox">£</div>
        </article>

        <article className="statCard orangeStat">
          <div className="statContent">
            <p className="statLabel">Goals Progress</p>
            <h2 className="statValue">{goalsProgress}%</h2>
            <span className="statSmallText">
              {activeGoals} active, {completedGoals} done
            </span>
          </div>

          <div className="circleProgress orangeCircle">
            <span>{goalsProgress}%</span>
          </div>
        </article>
      </section>

      <section className="chartCard">
        <div className="statisticsSectionHeader">
          <div>
            <h3 className="statisticsSectionTitle">Tasks Overview</h3>
            <p>Real task progress saved by day</p>
          </div>

          <span>{completionRate}% today</span>
        </div>

        <div className="lineChartBox">
          <svg
            className="lineChart"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.45)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
              </linearGradient>
            </defs>

            {chartPoints.length > 1 && (
              <path className="chartArea" d={areaPath} />
            )}

            <path className="chartLine" d={linePath} />

            {chartPoints.map((point, index) => (
              <circle
                key={`${point.label}-${index}`}
                className="chartDot"
                cx={point.x}
                cy={point.y}
                r="4"
              >
                <title>
                  {point.label}: {point.value}% | {point.completedTasks}/
                  {point.totalTasks} tasks
                </title>
              </circle>
            ))}
          </svg>

          <div className="chartLabels">
            {taskChartData.map((item, index) => (
              <span key={`${item.label}-${index}`}>{item.label}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="financeOverviewCard">
        <div className="statisticsSectionHeader">
          <div>
            <h3 className="statisticsSectionTitle">Finance Overview</h3>
            <p>Income, expenses and current balance</p>
          </div>
        </div>

        <div className="financeRows">
          <div className="financeRow">
            <span>Income</span>
            <strong className="incomeText">£{formatMoney(income)}</strong>
          </div>

          <div className="financeRow">
            <span>Expenses</span>
            <strong className="expenseText">£{formatMoney(expenses)}</strong>
          </div>

          <div className="financeRow">
            <span>Balance</span>
            <strong>£{formatMoney(balance)}</strong>
          </div>
        </div>
      </section>

      <section className="activityCard">
        <div className="statisticsSectionHeader">
          <div>
            <h3 className="statisticsSectionTitle">Recent Activity</h3>
            <p>Latest changes from Budget and Goals</p>
          </div>
        </div>

        <div className="activityList">
          {recentBudgetItems.length === 0 && recentGoals.length === 0 ? (
            <div className="emptyActivity">
              <h3>No activity yet</h3>
              <p>Add tasks, transactions or goals to see statistics.</p>
            </div>
          ) : (
            <>
              {recentBudgetItems.map((item) => (
                <div className="activityItem" key={`budget-${item.id}`}>
                  <div className="activityIcon budgetActivityIcon">£</div>

                  <div className="activityInfo">
                    <h4>{item.title}</h4>
                    <p>
                      {item.category} • {item.date}
                    </p>
                  </div>

                  <strong
                    className={
                      item.type === "income" ? "incomeText" : "expenseText"
                    }
                  >
                    {item.type === "income" ? "+" : "-"} £
                    {formatMoney(item.amount)}
                  </strong>
                </div>
              ))}

              {recentGoals.map((goal) => {
                const progress =
                  goal.targetAmount > 0
                    ? Math.min(
                        Math.round(
                          (goal.currentAmount / goal.targetAmount) * 100,
                        ),
                        100,
                      )
                    : 0;

                return (
                  <div className="activityItem" key={`goal-${goal.id}`}>
                    <div className="activityIcon goalActivityIcon">🎯</div>

                    <div className="activityInfo">
                      <h4>{goal.title}</h4>
                      <p>Goal progress</p>
                    </div>

                    <strong>{progress}%</strong>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
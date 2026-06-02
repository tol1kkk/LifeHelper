import { NavLink } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="homePage">
      <header className="homeHeader">
        <div>
          <h2 className="greeting">Good evening,</h2>
          <h1 className="userName">Anatolii 👋</h1>
          <p className="subtitle">Here's your summary for today</p>
        </div>

        <div className="headerActions">
          <div className="avatar">
            <img src="./userGrey.png" alt="User avatar" />
          </div>

          <button className="notificationButton">
            <img src="/bell.png" alt="Notifications" />
            <span></span>
          </button>
        </div>
      </header>

      <section className="dailySummary card">
        <div className="sectionHeader">
          {/* <h3>Daily Summary</h3>
          <span>›</span> */}
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
              <span className="quickIcon purple"><img src="/check.png" alt="" className="icons_home"/></span>
              <div className="quickContent">
                <h4 className="quickTitle">Tasks</h4>
                <p className="quickText">Manage your tasks</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/budget">
            <div className="quickCard card">
              <span className="quickIcon green"><img src="/wallet.png" alt="" className="icons_home"/></span>
              <div className="quickContent">
                <h4 className="quickTitle">Budget</h4>
                <p className="quickText">Track income & expenses</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/goals">
            <div className="quickCard card">
              <span className="quickIcon orange"><img src="/target.png" alt="" className="icons_home"/></span>
              <div className="quickContent">
                <h4 className="quickTitle">Goals</h4>
                <p className="quickText">Track your savings goals</p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/notes">
            <div className="quickCard card">
              <span className="quickIcon blue"><img src="/wirte.png" alt="" className="icons_home"/></span>
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
          <h3>Today's Tasks</h3>
          <a href="/tasks">View all</a>
        </div>

        <div className="taskList card">
          <div className="taskItem">
            <span className="checkedBox">✓</span>
            <p>Gym workout</p>
            <span className="tag greenTag">Health</span>
            <span className="taskDate">Today</span>
          </div>

          <div className="taskItem">
            <span className="emptyBox"></span>
            <p>Finish React project</p>
            <span className="tag purpleTag">Work</span>
            <span className="taskDate">Tomorrow</span>
          </div>

          <div className="taskItem">
            <span className="emptyBox"></span>
            <p>Study for exam</p>
            <span className="tag blueTag">Study</span>
            <span className="taskDate">Tomorrow</span>
          </div>
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

import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  const imagePath = import.meta.env.BASE_URL;

  return (
    <nav className="nav">
      <NavLink to="/">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
            <img
              src={
                isActive
                  ? `${imagePath}homePurple.png`
                  : `${imagePath}homeGrey.png`
              }
              alt="Home icon"
            />
            <p className={isActive ? "textActive" : "textDefault"}>Home</p>
          </div>
        )}
      </NavLink>

      <NavLink to="/tasks">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
            <img
              src={
                isActive
                  ? `${imagePath}taskPurple.png`
                  : `${imagePath}taskGrey.png`
              }
              alt="Tasks icon"
            />
            <p className={isActive ? "textActive" : "textDefault"}>Tasks</p>
          </div>
        )}
      </NavLink>

      <NavLink to="/budget">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
            <img
              src={
                isActive
                  ? `${imagePath}walletPurple.png`
                  : `${imagePath}walletGrey.png`
              }
              alt="Budget icon"
            />
            <p className={isActive ? "textActive" : "textDefault"}>Budget</p>
          </div>
        )}
      </NavLink>

      <NavLink to="/statistics">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
            <img
              src={
                isActive
                  ? `${imagePath}trendPurple.png`
                  : `${imagePath}trendGrey.png`
              }
              alt="Statistics icon"
            />
            <p className={isActive ? "textActive" : "textDefault"}>
              Statistics
            </p>
          </div>
        )}
      </NavLink>

      <NavLink to="/profile">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
            <img
              src={
                isActive
                  ? `${imagePath}userPurple.png`
                  : `${imagePath}userGrey.png`
              }
              alt="Profile icon"
            />
            <p className={isActive ? "textActive" : "textDefault"}>Profile</p>
          </div>
        )}
      </NavLink>
    </nav>
  );
}
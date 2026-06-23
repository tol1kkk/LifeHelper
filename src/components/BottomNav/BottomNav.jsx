import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="nav">

      <NavLink to="/">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
         <img src={isActive ? "/homePurple.png" : "/homeGrey.png"} alt="Icon"/>
        <p className={isActive ? "textActive" : "textDefault"}>Home</p>
        </div>
        )}
      </NavLink>

      <NavLink to="/tasks">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
        <img src={isActive ? "/taskPurple.png" : "/taskGrey.png"} alt="Icon"/>
        <p className={isActive ? "textActive" : "textDefault"}>Tasks</p>
      </div>
        )}
      </NavLink>

      <NavLink to="/budget">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
        <img src={isActive ? "/walletPurple.png" : "/walletGrey.png"} alt="Icon"/>
        <p className={isActive ? "textActive" : "textDefault"}>Budget</p>
      </div>
        )}
      </NavLink>

      <NavLink to="/statistics">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
        <img src={isActive ? "/trendPurple.png" : "/trendGrey.png"} alt="Icon"/>
        <p className={isActive ? "textActive" : "textDefault"}>Statistics</p>
      </div>
        )}
      </NavLink>

      <NavLink to="/profile">
        {({ isActive }) => (
          <div className={isActive ? "menuItemActive" : "menuItem"}>
        <img src={isActive ? "/userPurple.png" : "/userGrey.png"} alt="Icon"/>
        <p className={isActive ? "textActive" : "textDefault"}>Profile</p>
      </div>
        )}
      </NavLink>

    </nav>
  );
}
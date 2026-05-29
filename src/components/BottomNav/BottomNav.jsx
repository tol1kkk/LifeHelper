import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="nav">

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "active" : "link"
        }
      >
        <span>🏠</span>
        <p>Home</p>
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          isActive ? "active" : "link"
        }
      >
        <span>☑️</span>
        <p>Tasks</p>
      </NavLink>

      <NavLink
        to="/budget"
        className={({ isActive }) =>
          isActive ? "active" : "link"
        }
      >
        <span>💳</span>
        <p>Budget</p>
      </NavLink>

      <NavLink
        to="/statistics"
        className={({ isActive }) =>
          isActive ? "active" : "link"
        }
      >
        <span>📊</span>
        <p>Statistics</p>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "active" : "link"
        }
      >
        <span>👤</span>
        <p>Profile</p>
      </NavLink>

    </nav>
  );
}
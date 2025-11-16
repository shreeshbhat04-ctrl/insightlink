import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav-container">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/login" className="nav-link">Login</NavLink>
      <NavLink to="/register" className="nav-link">Register</NavLink>
      <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
    </nav>
  );
}

export default Navbar;

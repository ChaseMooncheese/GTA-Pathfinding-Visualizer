import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavItem text="GTA V Pathfinding Visualizer"></NavItem>
        <NavItem text="HI"></NavItem>
        <NavItem text="HI"></NavItem>
      </ul>
    </nav>
  );
}

function NavItem(props: { text: string }) {
  const [dropdownToggled, setDropdownToggled] = useState(false);
  return (
    <li className="nav-item">
      <a
        className="navbar-button"
        onClick={() => {
          setDropdownToggled(!dropdownToggled);
        }}
      >
        {props.text + dropdownToggled}
      </a>
    </li>
  );
}

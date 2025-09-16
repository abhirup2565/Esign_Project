import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
        <li><Link to="/">Status</Link></li>
        <li><Link to="/upload">Upload Docs</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

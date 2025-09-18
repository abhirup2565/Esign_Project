import { FaUpload, FaCog } from "react-icons/fa"; // icons from react-icons
import { MdDashboard } from "react-icons/md";
import "../styles/sidebar.css"
import NavbarLink from "./NavbarLink";

function Navbar() {
  return (
    <nav className="Sidebar">
      <ul className="Sidebar__container">
        <NavbarLink to="/" Sidebar__icon={MdDashboard} Sidebar__text="Status" />
        <NavbarLink to="/upload" Sidebar__icon={FaUpload} Sidebar__text="Upload Docs" />
        <NavbarLink to="/settings" Sidebar__icon={FaCog} Sidebar__text="Settings"/>
      </ul>
    </nav>
  );
}

export default Navbar;

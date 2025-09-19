import { FaUpload, FaCog ,FaBars} from "react-icons/fa"; // icons from react-icons
import { MdDashboard } from "react-icons/md";
import "../styles/sidebar.css"
import NavbarLink from "./NavbarLink";
import { useState } from "react"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div className="hamburger-container">
        <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>
    </div>
    
    <nav className={`Sidebar ${isOpen ? "open" : ""}`}>
      <ul className="Sidebar__container">
        <NavbarLink to="/" Sidebar__icon={MdDashboard} Sidebar__text="Status" onClick={() => setIsOpen(false)}/>
        <NavbarLink to="/upload" Sidebar__icon={FaUpload} Sidebar__text="Upload Docs" onClick={() => setIsOpen(false)}/>
        <NavbarLink to="/settings" Sidebar__icon={FaCog} Sidebar__text="Settings" onClick={() => setIsOpen(false)}/>
      </ul>
    </nav>
    </>
  );
}

export default Navbar;

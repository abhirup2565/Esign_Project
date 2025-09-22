import { FaUpload, FaCog ,FaBars} from "react-icons/fa"; // icons from react-icons
import { MdDashboard ,MdLogin, MdLogout, MdHome ,MdPersonAdd } from "react-icons/md";
import "../styles/sidebar.css"
import NavbarLink from "./NavbarLink";
import { useState } from "react"; 
import { useAppContext } from "../wrappers/AppContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); //for hamburger in mobile view
  const {user} = useAppContext();
  return (
    <>
    <div className="hamburger-container">
        <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>
    </div>
    
    <nav className={`Sidebar ${isOpen ? "open" : ""}`}>
      <ul className="Sidebar__container">
        <NavbarLink to="/" Sidebar__icon={MdHome} Sidebar__text="Home" onClick={() => setIsOpen(false)}/>
        {!user&&(<NavbarLink to="/login" Sidebar__icon={MdLogin} Sidebar__text="Login" onClick={() => setIsOpen(false)}/>)}
        {user&&(
        <>
        <NavbarLink to="/status" Sidebar__icon={MdDashboard} Sidebar__text="Status" onClick={() => setIsOpen(false)}/>
        {user.is_manager&&(<NavbarLink to="/create-user" Sidebar__icon={MdPersonAdd} Sidebar__text="Create User" onClick={() => setIsOpen(false)}/>)}
        {user.is_manager&&(<NavbarLink to="/upload" Sidebar__icon={FaUpload} Sidebar__text="Upload Docs" onClick={() => setIsOpen(false)}/>)}
        {user.is_manager&&(<NavbarLink to="/settings" Sidebar__icon={FaCog} Sidebar__text="Settings" onClick={() => setIsOpen(false)}/>)}
        <NavbarLink to="/logout" Sidebar__icon={MdLogout} Sidebar__text="Logout" onClick={() => setIsOpen(false)}/>
        </>
        )}
      </ul>
    </nav>
    </>
  );
}

export default Navbar;

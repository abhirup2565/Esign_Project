import { NavLink } from "react-router-dom";
import "../styles/sidebar.css"
const NavbarLink = ({to,Sidebar__icon,Sidebar__text})=>{
    return(<li className="Sidebar__item">
    <NavLink to={to} className="Sidebar__link">
    <Sidebar__icon className="Sidebar__icon" />
    <span className="Sidebar__text">{Sidebar__text}</span>
    </NavLink>
    </li>)
}
export default NavbarLink

import { Link } from "react-router-dom";
import "../styles/sidebar.css"
const NavbarLink = ({to,Sidebar__icon,Sidebar__text})=>{
    return(<li className="Sidebar__item">
    <Link to={to} className="Sidebar__link">
    <Sidebar__icon className="Sidebar__icon" />
    <span className="Sidebar__text">{Sidebar__text}</span>
    </Link>
    </li>)
}
export default NavbarLink

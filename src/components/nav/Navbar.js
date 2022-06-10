import { useNavigate, Link } from "react-router-dom"
import "./Navbar.css"


// Check to see if user is staff or customer. Render EmployeeNav or CustomerNav depending on this. 
export const Navbar = () => {
    const navigate = useNavigate() 

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__locations">
                <Link className="navbar__link" to="/profile">My Profile</Link>
            </li>

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("ml_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}


import React, { useState } from "react";
import "./NavBar.css";
import {NavLink, useNavigate} from "react-router-dom";

function Navbar() {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);
    let token = localStorage.getItem("token");

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact to={token == null ? "/" : "/dashboard"} className="nav-logo">
                        HealthManagementPortal
                        <i className="fas fa-code"></i>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        {token == null ? "" : <li className="nav-item" >
                            <NavLink
                                exact
                                to="/dashboard"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Dashboard
                            </NavLink>
                        </li>}
                        { token != null ? "" :<li className="nav-item">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Login
                            </NavLink>
                        </li>}
                        { token != null ? "" :<li className="nav-item">
                            <NavLink
                                exact
                                to="/register"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Register
                            </NavLink>
                        </li>}
                        { token != null ? <li className="nav-item">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleSignOut}
                            >
                                Logout
                            </NavLink>
                        </li> : ""}
                    </ul>

                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
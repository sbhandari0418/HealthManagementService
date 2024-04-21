import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleClick = () => setClick(!click);
    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo" onClick={handleClick}>
                        HealthManagementPortal <i className="fas fa-code"></i>
                    </NavLink>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        {!token && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/register"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {token && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/dashboard"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/user/profile"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        User Profile
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/user/password"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Change Password
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleSignOut}
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

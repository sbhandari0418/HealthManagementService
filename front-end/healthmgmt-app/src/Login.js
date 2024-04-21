import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file for styling

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token is present in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            // If token is present, redirect user to dashboard
            navigate("/dashboard");
        }
    }, [navigate]);

    const postLoginDetails = () => {
        fetch("/api/hms/user/login", {
            method: "POST",
            body: JSON.stringify({
                userName,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Login failed."); // Throw an error for non-successful responses
                }
                return response.text();
            })
            .then((token) => {
                localStorage.setItem("token", token);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error(error);
                alert("Login failed. Please try again."); // Display an error message for the user
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postLoginDetails();
        setPassword("");
        setUserName("");
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        <div className="login__container">
            <h2>Login</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="userName">Username</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    required
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginBtn">Sign In</button>
                <p>
                    Don't have an account?{" "}
                    <span className="link" onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;

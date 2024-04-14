import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const postLoginDetails = () => {
        fetch("http://localhost:8081/api/hms/user/login", {
            method: "POST",
            body: JSON.stringify({
                userName,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    data.text().then((a) => {
                        localStorage.setItem("token", a.toString());
                    });
                    window.location.replace("/dashboard");
                }
            })
            .catch((err) => console.error(err));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postLoginDetails();
        setPassword("");
        setuserName("");
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        <div className='login__container'>
            <h2>Login </h2>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='userName'>userName</label>
                <input
                    type='text'
                    id='userName'
                    name='userName'
                    value={userName}
                    required
                    onChange={(e) => setuserName(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>SIGN IN</button>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
						Sign up
					</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import your CSS file for styling

const Signup = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDOB] = useState("");
    const [address1, setAddr1] = useState("");
    const [address2, setAddr2] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [patientId, setPatientId] = useState("");
    const navigate = useNavigate();

    const postSignUpDetails = () => {
        fetch("/api/hms/user/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                userName,
                firstName,
                lastName,
                dob,
                address: {
                    address1,
                    address2,
                    state,
                    city,
                    postalCode
                },
                patientId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    alert("Account created successfully!");
                    navigate("/");
                }
            })
            .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postSignUpDetails();
        setEmail("");
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setDOB("");
        setCity("");
        setAddr1("");
        setAddr2("");
        setState("");
        setPostalCode("");
        setPatientId("");
    };

    const gotoLoginPage = () => navigate("/");

    return (
        <div className="signup__container">
            <h2>Sign up</h2>
            <form className="signup__form" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="address1">Address1</label>
                <input
                    type="text"
                    name="address1"
                    id="address1"
                    value={address1}
                    required
                    onChange={(e) => setAddr1(e.target.value)}
                />
                <label htmlFor="address2">Address2</label>
                <input
                    type="text"
                    name="address2"
                    id="address2"
                    value={address2}
                    onChange={(e) => setAddr2(e.target.value)}
                />
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="state">State</label>
                <input
                    type="text"
                    name="state"
                    id="state"
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                />
                <label htmlFor="postalCode">Postal Code</label>
                <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                />
                <label htmlFor="dob">Date of birth</label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={dob}
                    required
                    onChange={(e) => setDOB(e.target.value)}
                />
                <label htmlFor="patientId">FHIR Patient Id</label>
                <input
                    type="text"
                    id="patientId"
                    name="patientId"
                    value={patientId}
                    required
                    onChange={(e) => setPatientId(e.target.value)}
                />

                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="userName">Username</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="signupBtn">Sign Up</button>
                <p>
                    Already have an account?{" "}
                    <span className="link" onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;

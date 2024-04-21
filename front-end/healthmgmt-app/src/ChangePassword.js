import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        // Send request to backend to change password
        try {
            const response = await fetch("/api/hms/user/updatePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                }),
            });

            if (response.ok) {
                setSuccess("Password updated successfully.");
                setError("");
            } else {
                setError("Failed to update password. Please try again.");
                setSuccess("");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setError("Failed to update password. Please try again.");
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="password-form">
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;

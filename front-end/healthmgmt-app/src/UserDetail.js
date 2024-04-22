import React, { useState, useEffect } from "react";
import "./UserDetail.css";

const UserDetail = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            this.props.history.push("/");
            return; // Exit function early if token is not available
        }
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://healthmanagementapi.orangewave-663720c0.eastus.azurecontainerapps.io/api/hms/user", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Attach token to Authorization header
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="user-detail-container">
            <h2>User Detail</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="user-info">
                    <div>
                        <strong>First Name:</strong> {userData.firstName || "Not Available"}
                    </div>
                    <div>
                        <strong>Last Name:</strong> {userData.lastName || "Not Available"}
                    </div>
                    <div>
                        <strong>Email:</strong> {userData.email || "Not Available"}
                    </div>
                    <div>
                        <strong>User Name:</strong> {userData.userName || "Not Available"}
                    </div>
                    <div>
                        <strong>Date of Birth:</strong> {userData.dob || "Not Available"}
                    </div>
                    <div>
                        <strong>Address:</strong> {userData.address.address1}, {userData.address.city}, {userData.address.state} - {userData.address.postalCode}
                    </div>
                    <div>
                        <strong>Patient ID:</strong> {userData.patientId || "Not Available"}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetail;

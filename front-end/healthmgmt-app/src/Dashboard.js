import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("token")) {
                navigate("/");
            }
        };
        checkUser();
    }, [navigate]);


    return (
        <div className='dashboard'>
            <h2 style={{ marginBottom: "30px" }}>
                Howdy, Test
            </h2>
        </div>
    );
};

export default Dashboard;
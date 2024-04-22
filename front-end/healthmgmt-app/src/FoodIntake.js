import React, { useState, useEffect } from "react";
import "./FoodIntake.css";
import Chart from "chart.js/auto";

const FoodIntake = () => {
    const [foodName, setFoodName] = useState("");
    const [calories, setCalories] = useState("");
    const [date, setDate] = useState("");
    const [foodData, setFoodData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchFoodData();
    }, []);

    useEffect(() => {
        renderChart();
    }, [foodData]);

    const fetchFoodData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        try {
            const response = await fetch("https://healthmanagementapi.orangewave-663720c0.eastus.azurecontainerapps.io/api/hms/food", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch food data");
            }
            const data = await response.json();
            setFoodData(data);
        } catch (error) {
            console.error("Error fetching food data:", error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        try {
            const response = await fetch(
                `https://healthmanagementapi.orangewave-663720c0.eastus.azurecontainerapps.io/api/hms/food/tracker/${foodName}/${calories}/${date}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add food intake");
            }
            console.log("Food intake added successfully");
            setFoodName("");
            setCalories("");
            setDate("");
            fetchFoodData();
        } catch (error) {
            console.error("Error adding food intake:", error);
        }
    };

    const toggleAddForm = () => {
        setShowAddForm((prevShowAddForm) => !prevShowAddForm);
    };

    const renderChart = () => {
        const dates = foodData.map((food) => food.date);
        const totalCalories = foodData.map((food) => food.totalCalories);

        const ctx = document.getElementById("foodIntakeChart");
        if (!ctx) return;

        setChartData(
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: dates,
                    datasets: [{
                        label: "Calories vs. Time",
                        data: totalCalories,
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        fill: false,
                    }],
                },
            })
        );
    };

    return (
        <div className="food-intake-container">
            <h2>Food Intake</h2>
            <a className="add-food-intake" onClick={toggleAddForm}>
                {showAddForm ? "Hide Form" : "Add Food Intake"}
                <span className="down-arrow">&#9660;</span>
            </a>
            <div className={`add-food-intake-content ${showAddForm ? "show" : ""}`}>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label className="form-label">Food Name:</label>
                        <input
                            type="text"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Calories:</label>
                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="form-submit">
                        Add Food Intake
                    </button>
                </form>
            </div>
            <h2>Calories Trend over time</h2>
            {foodData.length > 0 ? (
                <div className="chart-container">
                    {/* Display loading indicator while chart data is being fetched */}
                    {loading ? (
                        <p>Loading chart...</p>
                    ) : (
                        <canvas id="foodIntakeChart"></canvas>
                    )}
                </div>
            ) : (
                <p className="calorie-upload-message">No data available. Please upload calorie intake.</p>
            )}
        </div>
    );
};

export default FoodIntake;

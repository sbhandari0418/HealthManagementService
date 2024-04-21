import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./HealthTracking.css";
import FoodIntake from "./FoodIntake"; // Import CSS file for styling

const HealthTracking = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (selectedCategory === "BloodPressure") {
            renderBloodPressureCharts();
        } else if (selectedCategory === "BloodGlucose") {
            renderBloodGlucoseChart();
        }
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const renderBloodPressureCharts = () => {
        const bloodPressureData = data.find((category) => category.healthTrackingCategory === "BloodPressure");
        const sortedData = bloodPressureData.healthDataDTOS.sort((a, b) => new Date(a.observationData) - new Date(b.observationData));
        const systolicValues = sortedData.map((item) => parseFloat(item.value.split(',')[1].split(':')[1]));
        const diastolicValues = sortedData.map((item) => parseFloat(item.value.split(',')[0].split(':')[1]));

        const ctxSystolic = document.getElementById("systolicChart");
        const ctxDiastolic = document.getElementById("diastolicChart");

        new Chart(ctxSystolic, {
            type: "line",
            data: {
                labels: bloodPressureData.healthDataDTOS.map((item) => item.observationData),
                datasets: [{
                    label: "Systolic",
                    data: systolicValues,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    fill: false,
                },
                    {
                        label: "Normal Systolic Level",
                        data: Array(systolicValues.length).fill(120),
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        borderDash: [5, 5],
                        fill: false
                    }],
            },
        });

        new Chart(ctxDiastolic, {
            type: "line",
            data: {
                labels: bloodPressureData.healthDataDTOS.map((item) => item.observationData),
                datasets: [{
                    label: "Diastolic",
                    data: diastolicValues,
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    fill: false,
                },
                    {
                        label: "Normal Diastolic Level",
                        data: Array(diastolicValues.length).fill(80),
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        borderDash: [5, 5],
                        fill: false
                    }],
            },
        });
    };

    const renderBloodGlucoseChart = () => {
        const bloodGlucoseData = data.find((category) => category.healthTrackingCategory === "BloodGlucose");
        const sortedData = bloodGlucoseData.healthDataDTOS.sort((a, b) => new Date(a.observationData) - new Date(b.observationData));
        const glucoseValues = sortedData.map((item) => parseFloat(item.value));

        const ctx = document.getElementById("bloodGlucoseChart");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: bloodGlucoseData.healthDataDTOS.map((item) => item.observationData),
                datasets: [{
                    label: "Blood Glucose",
                    data: glucoseValues,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: false,
                },
                    {
                        label: "Normal Level",
                        data: Array(glucoseValues.length).fill(110),
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        borderDash: [5, 5],
                        fill: false
                    }],
            },
        });
    };

    return (
        <div className="health-tracking-container">
            <div className="sidebar">
                <h3 className="sidebar-title">Health Categories</h3>
                <ul className="category-list">
                    {data.map((category, index) => (
                        <li key={index}>
                            <button onClick={() => handleCategoryClick(category.healthTrackingCategory)}>
                                {category.healthTrackingCategory}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="content">
                {selectedCategory && (
                    <div className="category-data">
                        <h2>{selectedCategory}</h2>
                        {selectedCategory === "BloodPressure" && (
                            <>
                                <div>
                                    <h3>Systolic Trend</h3>
                                    <canvas id="systolicChart"/>
                                </div>
                                <div>
                                    <h3>Diastolic Trend</h3>
                                    <canvas id="diastolicChart"/>
                                </div>
                            </>
                        )}
                        {selectedCategory === "BloodGlucose" && (
                            <div>
                                <h3>Blood Glucose Trend</h3>
                                <canvas id="bloodGlucoseChart"/>
                            </div>
                        )}
                    </div>
                )}

                {(selectedCategory === "BloodPressure" || selectedCategory === "BloodGlucose") && (
                    <FoodIntake/>
                )}
            </div>
        </div>
    );
};

export default HealthTracking;

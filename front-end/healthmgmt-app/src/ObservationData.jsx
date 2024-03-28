import React, { useState, useEffect } from 'react';

function ObservationData({ patientId }) {
    const [observations, setObservations] = useState([]);

    useEffect(() => {
        const fetchObservations = async () => {
            try {
                // Update the URL to match your actual API endpoint for fetching observation data
                const response = await fetch(`http://your-backend-api/observations?patientId=${patientId}`);
                const data = await response.json();
                setObservations(data);
            } catch (error) {
                console.error("Error fetching observation data:", error);
            }
        };

        fetchObservations();
    }, [patientId]);

    if (observations.length === 0) {
        return <div>No observations found or loading data...</div>;
    }

    return (
        <div>
            <h2>Observations</h2>
            {observations.map((obs, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <p><strong>ID:</strong> {obs.id}</p>
                    <p><strong>Category:</strong> {obs.category?.[0]?.coding?.[0]?.display}</p>
                    <p><strong>Code:</strong> {obs.code?.coding?.[0]?.display}</p>
                    <p><strong>Patient:</strong> {obs.subject?.display}</p>
                    <p><strong>Date:</strong> {obs.effectiveDateTime}</p>
                    <p><strong>Value:</strong> {obs.valueQuantity?.value} {obs.valueQuantity?.unit}</p>
                    <p><strong>Interpretation:</strong> {obs.interpretation?.[0]?.coding?.[0]?.display}</p>
                </div>
            ))}
        </div>
    );
}

export default ObservationData;

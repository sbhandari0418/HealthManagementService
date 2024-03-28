import React, { useState, useEffect } from 'react';


function PatientData({ patientId }) {
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://your-backend-api/patients/${patientId}`);
                const data = await response.json();
                setPatient(data);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        if (patientId) {
            fetchPatientData();
        }
    }, [patientId]); // Depend on patientId so it fetches new data when the ID changes

    if (!patient) {
        return <div>Loading patient data...</div>;
    }

    return (
        <div>
            <h1>Patient Information</h1>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            {/* Display other patient details */}
        </div>
    );
}

export default PatientData;

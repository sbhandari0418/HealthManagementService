import React, { useState, useEffect } from 'react';

function PatientData({ patientId }) {
    const [patientInfo, setPatientInfo] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                // Adjust the URL to match your API endpoint for fetching patient data
                const response = await fetch(`YOUR_BACKEND_API/patients/${patientId}`);
                const data = await response.json();
                setPatientInfo(data);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        if (patientId) {
            fetchPatientData();
        }
    }, [patientId]);

    if (!patientInfo) {
        return <div>Loading patient data...</div>;
    }

    // Constructing the full name from the first entry in the name array
    // This is a simplification and might need to be adapted based on your data's structure.
    const fullName = patientInfo.name?.[0]?.text || [patientInfo.name?.[0]?.given.join(' '), patientInfo.name?.[0]?.family].join(' ');

    // Attempting to fetch the name of the first general practitioner, if any
    // This might need adjustments based on how your FHIR server structures this data.
    const gpName = patientInfo.generalPractitioner?.[0]?.display || 'Not specified';

    return (
        <div>
            <h1>Patient Information</h1>
            <p><strong>ID:</strong> {patientInfo.id}</p>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Gender:</strong> {patientInfo.gender}</p>
            <p><strong>Birth Date:</strong> {patientInfo.birthDate}</p>
            <p><strong>General Practitioner:</strong> {gpName}</p>
        </div>
    );
}

export default PatientData;


import React, { useState } from 'react';
import PatientData from './PatientData';
import ObservationData from './ObservationData';

function PatientSearch() {
    const [patientId, setPatientId] = useState('');
    const [fetchData, setFetchData] = useState(false);

    const handleSearch = () => {
        if (patientId.trim()) { // Checks if the input is not just empty spaces
            setFetchData(true); // Triggers the rendering of PatientData and ObservationData components
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {/* Now fetchData triggers both components' rendering */}
            {fetchData && (
                <>
                    <PatientData patientId={patientId} />
                    <ObservationData patientId={patientId} />
                </>
            )}
        </div>
    );
}

export default PatientSearch;

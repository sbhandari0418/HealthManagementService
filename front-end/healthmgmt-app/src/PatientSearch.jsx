import React, { useState } from 'react';
import PatientData from './PatientData';

function PatientSearch() {
    const [patientId, setPatientId] = useState('');
    const [fetchPatient, setFetchPatient] = useState(false);

    const handleSearch = () => {
        if (patientId) {
            setFetchPatient(true);
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
            {fetchPatient && <PatientData patientId={patientId} />}
        </div>
    );
}

export default PatientSearch;
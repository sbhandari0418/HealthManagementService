package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.HealthTrendDTO;

import java.util.List;
import java.util.Map;

public interface IFHIRService {

    Map<String, Object> getPatientDataByUsername(String username);

    Map<String, Object> getPatientDataByPatientId(String patientId);

    List<HealthTrendDTO> getObservationData(String username);
}

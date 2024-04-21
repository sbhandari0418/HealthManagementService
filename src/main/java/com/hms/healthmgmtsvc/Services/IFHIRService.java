package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.HealthTrendDTO;

import java.util.List;
import java.util.Map;

public interface IFHIRService {

    Map<String, Object> getPatientDataByUsername(String username);

    Map<String, Object> getPatientDataByPatientId(String patientId);

    Map<String, Object> getObservationRawData(String username);

    List<HealthTrendDTO> getObservationData(String username);
}

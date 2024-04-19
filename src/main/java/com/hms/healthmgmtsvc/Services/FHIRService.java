package com.hms.healthmgmtsvc.Services;

import com.eclipsesource.json.JsonObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.wnameless.json.flattener.JsonFlattener;
import com.hms.healthmgmtsvc.DTO.HealthDataDTO;
import com.hms.healthmgmtsvc.DTO.HealthTrackingCategory;
import com.hms.healthmgmtsvc.DTO.HealthTrendDTO;
import com.hms.healthmgmtsvc.Repositories.UserRepository;
import com.hms.healthmgmtsvc.Repositories.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class FHIRService implements IFHIRService {

    @Value("${fhir.base.url}")
    private String BASEURL;

    private final UserRepository userRepository;

    @Autowired
    public FHIRService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Map<String, Object> getPatientDataByUsername(String username) {
        String patientId = getPatientIdByUsername(username);
        return getPatientDataByPatientId(patientId);
    }

    public List<HealthTrendDTO> getObservationData(String username){

        try {
            String patientId = getPatientIdByUsername(username);
            var client = HttpClient.newHttpClient();

            var request = HttpRequest.newBuilder(
                            URI.create(BASEURL+"/Observation" + "?patient=" + patientId))
                    .header("accept", "application/json")
                    .GET()
                    .build();

            var responseFuture = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

            Map<String, Object> result = new ObjectMapper().readValue(responseFuture.get().body(), HashMap.class);

            int entrySize = ((ArrayList)result.get("entry")).size();

            Map<String, Object> flattenedJsonMap = JsonFlattener.flattenAsMap(responseFuture.get().body());
            return getHealthTrend(flattenedJsonMap, entrySize);
        }
        catch (Exception e){
            return null;
        }
    }

    public Map<String, Object> getPatientDataByPatientId(String patientId) {
        try {
            var client = HttpClient.newHttpClient();

            var request = HttpRequest.newBuilder(
                            URI.create(BASEURL + "/Patient" + "?_id=" + patientId))
                    .header("accept", "application/json")
                    .GET()
                    .build();

            var responseFuture = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

            Map<String, Object> result = new ObjectMapper().readValue(responseFuture.get().body(), HashMap.class);

            return result;
        }
        catch (Exception e){
            return null;
        }
    }

    private String getPatientIdByUsername(String username){
        Optional<Users> users = this.userRepository.findById(username);
        if (users.isEmpty()){
            throw new UsernameNotFoundException("Username not present");
        }
        else {
            return users.get().getPatientId();
        }
    }

    private List<HealthTrendDTO> getHealthTrend(Map<String, Object> data, int entrySize) throws JsonProcessingException, ParseException {
        List<HealthTrendDTO> healthTrendDTOS = new ArrayList<>();
        ArrayList<HealthDataDTO> bloodPressureDTOS = new ArrayList<>();
        ArrayList<HealthDataDTO> bloodGlucoseDTOS = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        for(int i = 0; i < entrySize; i++){
            String obsType = data.get("entry[" + i + "]" +".resource.code.text").toString();
            if (obsType.equals("Blood Pressure")){
                HealthDataDTO bloodPressureDTO = new HealthDataDTO();
                StringBuilder bloodPressure = new StringBuilder();
                for (int j = 0; j < 2; j++){
                    String type = data.get("entry[" + i + "]" +".resource.component[" + j +"].code.text").toString();
                    if (type.contains("Diastolic")){
                        bloodPressure.append("Diastolic: " +  data.get("entry[" + i + "]" +".resource.component[" + j +"].valueQuantity.value") + ",");
                    }else{
                        bloodPressure.append("Systolic: " +  data.get("entry[" + i + "]" +".resource.component[" + j +"].valueQuantity.value") + ",");
                    }
                }
                bloodPressure.substring(0, bloodPressure.length()-2);
                bloodPressureDTO.setValue(bloodPressure.toString());

                bloodPressureDTO.setObservationData(OffsetDateTime.parse(data.get("entry["+i+"]"+".resource.issued").toString(), formatter));
                bloodPressureDTOS.add(bloodPressureDTO);
            } else if (obsType.equals("Glucose")) {
                HealthDataDTO bloodGlucoseDTO = new HealthDataDTO();
                bloodGlucoseDTO.setValue(data.get("entry["+i+"]"+".resource.valueQuantity.value").toString());
                bloodGlucoseDTO.setObservationData(OffsetDateTime.parse(data.get("entry["+i+"]"+".resource.issued").toString(), formatter));
                bloodGlucoseDTOS.add(bloodGlucoseDTO);
            }
        }
        healthTrendDTOS.add(new HealthTrendDTO(HealthTrackingCategory.BloodPressure, bloodPressureDTOS));
        healthTrendDTOS.add(new HealthTrendDTO(HealthTrackingCategory.BloodGlucose, bloodGlucoseDTOS));
        return healthTrendDTOS;
    }
}

package com.hms.healthmgmtsvc.Controllers;

import com.hms.healthmgmtsvc.DTO.HealthTrendDTO;
import com.hms.healthmgmtsvc.Services.IFHIRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://zealous-mushroom-0c05d8a0f.5.azurestaticapps.net", "https://healthmanagementapi.orangewave-663720c0.eastus.azurecontainerapps.io"})
@RequestMapping("/api/hms/fhir")
public class FHIRController {

    private IFHIRService ifhirService;

    @Autowired
    public FHIRController(IFHIRService ifhirService){
        this.ifhirService = ifhirService;
    }

    @GetMapping("patientData")
    public Map<String, Object> GetPatientData(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ifhirService.getPatientDataByUsername(authentication.getName());
    }

    @GetMapping("patientHealthData")
    public List<HealthTrendDTO> GetPatientHealthData(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ifhirService.getObservationData(authentication.getName());
    }
}

package com.hms.healthmgmtsvc.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HealthTrendDTO {
    private HealthTrackingCategory healthTrackingCategory;
    private ArrayList<HealthDataDTO> healthDataDTOS;
}

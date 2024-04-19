package com.hms.healthmgmtsvc.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HealthDataDTO {

    private OffsetDateTime observationData;
    private String value;

}

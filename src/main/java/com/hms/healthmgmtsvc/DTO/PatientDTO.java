package com.hms.healthmgmtsvc.DTO;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private UserAddress address;
    private Date dob;
    private String patientId;
    private String practitioner;
    private String height;
    private String weight;
    private String bmi;
    private String age;
    private String phoneNumber;
}

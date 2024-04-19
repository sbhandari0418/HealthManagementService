package com.hms.healthmgmtsvc.DTO;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private UserAddress address;
    private String password;
    private Date dob;
    private String patientId;


}

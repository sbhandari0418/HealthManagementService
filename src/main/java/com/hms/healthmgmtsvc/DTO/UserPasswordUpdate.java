package com.hms.healthmgmtsvc.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPasswordUpdate {

    private String userName;
    private String oldPassword;
    private String newPassword;
}

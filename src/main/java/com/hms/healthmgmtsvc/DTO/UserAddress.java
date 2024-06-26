package com.hms.healthmgmtsvc.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAddress {
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String postalCode;

    private String country;
}

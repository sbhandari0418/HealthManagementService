package com.hms.healthmgmtsvc.Repositories;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String postalCode;
    private Date dob;



}

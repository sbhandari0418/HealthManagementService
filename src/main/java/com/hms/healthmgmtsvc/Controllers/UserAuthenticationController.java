package com.hms.healthmgmtsvc.Controllers;

import com.hms.healthmgmtsvc.DTO.PatientDTO;
import com.hms.healthmgmtsvc.DTO.UserInfo;
import com.hms.healthmgmtsvc.DTO.UserPasswordUpdate;
import com.hms.healthmgmtsvc.Services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://zealous-mushroom-0c05d8a0f.5.azurestaticapps.net"})
@RequestMapping("/api/hms/user")
public class UserAuthenticationController {

    private UserInfoService userInfoService;

    @Autowired
    public UserAuthenticationController(UserInfoService userInfoService){
        this.userInfoService = userInfoService;
    }

    @GetMapping
    public PatientDTO getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userInfoService.getUserDetails(authentication.getName());
    }

    @PostMapping("register")
    public String registerUser(@RequestBody UserInfo userInfo){
        return userInfoService.registerUser(userInfo);
    }

    @PostMapping("updatePassword")
    public String updatePassword(@RequestBody UserPasswordUpdate userPasswordDetails){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userPasswordDetails.setUserName(authentication.getName());
        return userInfoService.updatePassword(userPasswordDetails);
    }

    @PostMapping("login")
    public ResponseEntity<Object> userLogin(@RequestBody UserInfo userInfo){
        return ResponseEntity.ok(userInfoService.userLogin(userInfo));
    }
}

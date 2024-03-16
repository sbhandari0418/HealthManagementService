package com.hms.healthmgmtsvc.Controllers;

import com.hms.healthmgmtsvc.DTO.UserInfo;
import com.hms.healthmgmtsvc.Services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/hms/user")
public class UserAuthenticationController {

    private UserInfoService userInfoService;

    @Autowired
    public UserAuthenticationController(UserInfoService userInfoService){
        this.userInfoService = userInfoService;
    }

    @GetMapping("/{userId}")
    public String getUser(@PathVariable String userId){
        return userInfoService.getUserDetails(userId);
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserInfo userInfo){
        return userInfoService.registerUser(userInfo);
    }
}

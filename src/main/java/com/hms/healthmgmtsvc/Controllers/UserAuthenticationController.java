package com.hms.healthmgmtsvc.Controllers;

import com.hms.healthmgmtsvc.DTO.UserInfo;
import com.hms.healthmgmtsvc.DTO.UserPasswordUpdate;
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

    @GetMapping("{userName}")
    public UserInfo getUser(@PathVariable String userName){
        return userInfoService.getUserDetails(userName);
    }

    @PostMapping("register")
    public String registerUser(@RequestBody UserInfo userInfo){
        return userInfoService.registerUser(userInfo);
    }

    @PostMapping("updatePassword")
    public String updatePassword(@RequestBody UserPasswordUpdate userPasswordDetails){
        return userInfoService.updatePassword(userPasswordDetails);
    }

    @PostMapping("login")
    public String userLogin(@RequestBody UserInfo userInfo){
        return userInfoService.userLogin(userInfo);
    }
}

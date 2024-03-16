package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.UserInfo;
import org.springframework.stereotype.Service;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Override
    public void authenticateUser(String userId, String password) {

    }

    @Override
    public String registerUser(UserInfo userInfo) {
        return "Successfully registered.";
    }

    @Override
    public String getUserDetails(String userId){
        return userId;
    }
}

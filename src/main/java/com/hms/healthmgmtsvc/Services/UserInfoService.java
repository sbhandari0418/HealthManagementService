package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.UserInfo;

public interface UserInfoService {

    void authenticateUser(String userId, String password);

    String registerUser(UserInfo userInfo);

    String getUserDetails(String userId);

}

package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.UserInfo;
import com.hms.healthmgmtsvc.DTO.UserPasswordUpdate;

public interface UserInfoService {

    void authenticateUser(String userId, String password);

    String registerUser(UserInfo userInfo);

    UserInfo getUserDetails(String userId);

    String updatePassword(UserPasswordUpdate userPasswordUpdate);

}

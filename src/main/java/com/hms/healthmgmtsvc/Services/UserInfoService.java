package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.PatientDTO;
import com.hms.healthmgmtsvc.DTO.UserInfo;
import com.hms.healthmgmtsvc.DTO.UserPasswordUpdate;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public interface UserInfoService {

    String registerUser(UserInfo userInfo);

    PatientDTO getUserDetails(String userId);

    String updatePassword(UserPasswordUpdate userPasswordUpdate);

    Object userLogin(UserInfo userInfo);

}

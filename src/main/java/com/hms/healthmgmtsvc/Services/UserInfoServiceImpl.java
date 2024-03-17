package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.UserAddress;
import com.hms.healthmgmtsvc.DTO.UserInfo;
import com.hms.healthmgmtsvc.DTO.UserPasswordUpdate;
import com.hms.healthmgmtsvc.Repositories.Users;
import com.hms.healthmgmtsvc.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    private final UserRepository userRepository;
    @Autowired
    public UserInfoServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void authenticateUser(String userId, String password) {

    }

    @Override
    public String registerUser(UserInfo userInfo) {

        Users users = new Users(
                userInfo.getUserName(),
                userInfo.getPassword(),
                userInfo.getFirstName(),
                userInfo.getLastName(),
                userInfo.getEmail(),
                userInfo.getAddress().getAddress1(),
                userInfo.getAddress().getAddress2(),
                userInfo.getAddress().getCity(),
                userInfo.getAddress().getState(),
                userInfo.getAddress().getPostalCode(),
                userInfo.getDob());

        userRepository.save(users);
        return "Successfully registered.";
    }

    @Override
    public UserInfo getUserDetails(String userName){
        Optional<Users> users = userRepository.findById(userName);
        UserInfo userInfo = new UserInfo();

        if (!users.isEmpty()){
            userInfo = new UserInfo(
                    users.get().getFirstName(),
                    users.get().getLastName(),
                    users.get().getEmail(),
                    users.get().getUserName(),
                    new UserAddress(
                            users.get().getAddress1(),
                            users.get().getAddress2(),
                            users.get().getCity(),
                            users.get().getState(),
                            users.get().getPostalCode(),
                            null
                    ),
                    null,
                    users.get().getDob()
            );
        }

        return userInfo;
    }


    @Override
    public String updatePassword(UserPasswordUpdate userPasswordUpdate){
        Optional<Users> users = userRepository.findById(userPasswordUpdate.getUserName());
        if (users.isEmpty()){
            return "User not found";
        }
        else{
            if (userPasswordUpdate.getOldPassword().equals(users.get().getPassword())){
                Users user = users.get();
                user.setPassword(userPasswordUpdate.getNewPassword());
                userRepository.save(user);
            }
            else {
                return "Cannot update password.";
            }
        }
        return "Updated Succcessfully.";
    }
}

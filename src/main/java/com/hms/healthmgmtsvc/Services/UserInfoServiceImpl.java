package com.hms.healthmgmtsvc.Services;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.hms.healthmgmtsvc.DTO.PatientDTO;
import com.hms.healthmgmtsvc.DTO.UserAddress;
import com.hms.healthmgmtsvc.DTO.UserInfo;
import com.hms.healthmgmtsvc.DTO.UserPasswordUpdate;
import com.hms.healthmgmtsvc.Repositories.Users;
import com.hms.healthmgmtsvc.Repositories.UserRepository;
import com.hms.healthmgmtsvc.Utilities.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final IFHIRService fhirService;

    @Autowired
    public UserInfoServiceImpl(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            PasswordEncoder passwordEncoder,
            IFHIRService fhirService){
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.fhirService = fhirService;
    }

    @Override
    public String registerUser(UserInfo userInfo) {
        if (isUserValid(userInfo.getUserName())) return "Username already Exists. Cannot Register.";
        Map<String, Object> patientData = fhirService.getPatientDataByPatientId(userInfo.getPatientId());
        if (patientData == null || Integer.parseInt(patientData.get("total").toString()) == 0) return "PatientId invalid";
        Users users = new Users(
                userInfo.getUserName(),
                passwordEncoder.encode(userInfo.getPassword()),
                userInfo.getFirstName(),
                userInfo.getLastName(),
                userInfo.getEmail(),
                userInfo.getAddress().getAddress1(),
                userInfo.getAddress().getAddress2(),
                userInfo.getAddress().getCity(),
                userInfo.getAddress().getState(),
                userInfo.getAddress().getPostalCode(),
                userInfo.getDob(),
                userInfo.getPatientId());

        userRepository.save(users);
        return "Successfully registered.";
    }

    @Override
    public PatientDTO getUserDetails(String userName){
        Optional<Users> users = userRepository.findById(userName);
        PatientDTO patientDTO = new PatientDTO();


        if (users.isPresent()){
            patientDTO = new PatientDTO(
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
                    users.get().getDob(),
                    users.get().getPatientId(),
                    null,
                    null,
                    null,
                    null,
                    null,
                    null

            );
        }
        return patientDTO;
    }


    @Override
    public String updatePassword(UserPasswordUpdate userPasswordUpdate){

        if (!isUserValid(userPasswordUpdate.getUserName())) return "User not found.";

        Optional<Users> users = userRepository.findById(userPasswordUpdate.getUserName());

        if (authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userPasswordUpdate.getUserName(),userPasswordUpdate.getOldPassword()))
                .isAuthenticated()){
            Users user = users.get();
            user.setPassword(passwordEncoder.encode(userPasswordUpdate.getNewPassword()));
            userRepository.save(user);
        }
        else {
            return "Cannot update password.";
        }
        return "Updated Succcessfully.";
    }

    @Override
    public Object userLogin(UserInfo userInfo) {
        if (!isUserValid(userInfo.getUserName())) return "User not found.";

        Optional<Users> users = userRepository.findById(userInfo.getUserName());
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("User"));
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userInfo.getUserName(),  userInfo.getPassword(), authorities));
        if(authentication.isAuthenticated()){
            String token = jwtService.GenerateToken(users.get().getUserName());
            return token;

        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }

    /**
    Helper method to check whether userId is valid
     */
    private boolean isUserValid(String userId) {

        Optional<Users> users = userRepository.findById(userId);
        return users.isPresent();
    }

    private String encryptPassword(String password){
        return null;
    }
}

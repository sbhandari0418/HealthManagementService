package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.Repositories.UserRepository;
import com.hms.healthmgmtsvc.Repositories.Users;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Optional<Users> users = userRepository.findById(username);
       if (users.isEmpty()) throw new UsernameNotFoundException("User not found.");
       return UserDetailsImpl.build(users.get());
    }
}

package com.example.imageioapi.application.users;

import com.example.imageioapi.application.jwt.JwtService;
import com.example.imageioapi.domain.AccessToken;
import com.example.imageioapi.domain.entity.User;
import com.example.imageioapi.domain.exception.DuplicatedTupleException;
import com.example.imageioapi.domain.service.UserService;
import com.example.imageioapi.infra.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public User save(User user) {
        var possibleuser = getByEmail(user.getEmail());
        if(possibleuser != null) {
            throw new DuplicatedTupleException("Usuário já existente!");
        }
        encodePassword(user);
        return userRepository.save(user);
    }

    @Override
    public AccessToken autheticate(String email, String password) {
        var user = getByEmail(email);
        if(user == null){
            return null;
        }

        boolean matches = passwordEncoder.matches(password, user.getPassword());

        if(matches){
            return jwtService.generateToken(user);
        }

        return null;
    }

    private void encodePassword(User user){
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);
    }
}

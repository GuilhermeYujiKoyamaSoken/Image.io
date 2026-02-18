package com.example.imageioapi.domain.service;

import com.example.imageioapi.domain.AccessToken;
import com.example.imageioapi.domain.entity.User;

public interface UserService {
    User getByEmail(String email);
    User save(User user);
    AccessToken autheticate(String email, String password);
}

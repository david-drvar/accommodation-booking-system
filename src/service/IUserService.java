package service;

import beans.User;

public interface IUserService extends IService<User> {
    User getUserByUsername(String username);
    User login(String username, String password);
}

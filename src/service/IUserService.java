package service;

import beans.User;

public interface IUserService extends IService<User> {

    Boolean checkUsernameUnique(String username);
    User getUserByUsername(String username);
    User login(String username, String password);
}

package service;

import beans.User;

public interface IUserService extends IService<User> {

    Boolean checkUsernameUnique(String username);
}

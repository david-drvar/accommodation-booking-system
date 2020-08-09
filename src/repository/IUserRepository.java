package repository;

import beans.User;
import service.IService;

public interface IUserRepository extends IRepository<User> {
    User getUserByUsername(String username);
}

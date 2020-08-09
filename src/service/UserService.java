package service;

import beans.User;
import repository.IUserRepository;

import java.util.Collection;

public class UserService implements IUserService{

    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User entity) {
        return userRepository.save(entity);
    }

    @Override
    public void edit(User entity) {
        userRepository.edit(entity);
    }

    @Override
    public User get(long id) {
        return userRepository.get(id);
    }

    @Override
    public Collection<User> getAll() {
        return userRepository.getAll();
    }

    @Override
    public void delete(User entity) {
        userRepository.delete(entity);
    }

    @Override
    public Boolean checkUsernameUnique(String username) {
        for(User user : this.getAll()) {
            if (user.getUsername().equals(username))
                return false;
        }
        return true;
    }
}

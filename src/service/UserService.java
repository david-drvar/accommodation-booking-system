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
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Override
    public User login(String username, String password) {
        User user = getUserByUsername(username);
        if(user == null) return null;
        if(!user.getPassword().equals(password))
            return null;
        return user;
    }
}

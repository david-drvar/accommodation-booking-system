package repository.impl;

import beans.User;
import repository.IUserRepository;
import repository.json.JSONRepository;
import repository.json.stream.IJSONStream;

import java.util.Collection;

public class UserRepository extends JSONRepository<User> implements IUserRepository {

    public UserRepository(IJSONStream<User> stream) {
        super(stream);
    }

    @Override
    public User getUserByUsername(String username) {
        return getAll().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }
}

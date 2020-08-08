package repository;

import beans.User;
import repository.json.JSONRepository;
import repository.json.stream.IJSONStream;

import java.util.Collection;

public class UserRepository extends JSONRepository<User> implements IUserRepository {

    public UserRepository(IJSONStream<User> stream) {
        super(stream);
    }
}

package service;

import beans.Host;
import beans.User;
import dto.HostViewOfUsers;
import repository.IApartmentRepository;

import java.util.Collection;
import java.util.List;

public interface IUserService extends IService<User> {

    Boolean checkUsernameUnique(String username);
    User getUserByUsername(String username);
    User login(String username, String password);

    Collection<HostViewOfUsers> getUsersByReservations(Host host);

    void setApartmentRepository(IApartmentRepository apartmentRepository);
}

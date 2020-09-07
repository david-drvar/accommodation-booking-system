package service.impl;

import beans.*;
import dto.HostViewOfUsers;
import repository.IApartmentRepository;
import repository.IUserRepository;
import service.IUserService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private IApartmentRepository apartmentRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void setApartmentRepository(IApartmentRepository apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }

    @Override
    public void blockUser(User user) {
        if (user.getUserType() == Enum.valueOf(UserType.class, "GUEST")) {
            Guest guest = (Guest) this.get(user.getId());
            guest.setBlocked(true);
            this.edit(guest);
        }
        else if (user.getUserType() == Enum.valueOf(UserType.class, "HOST")) {
            Host host = (Host) this.get(user.getId());
            host.setBlocked(true);
            this.edit(host);
        }
    }

    @Override
    public void unblockUser(User user) {
        if (user.getUserType() == Enum.valueOf(UserType.class, "GUEST")) {
            Guest guest = (Guest) this.get(user.getId());
            guest.setBlocked(false);
            this.edit(guest);
        }
        else if (user.getUserType() == Enum.valueOf(UserType.class, "HOST")) {
            Host host = (Host) this.get(user.getId());
            host.setBlocked(false);
            this.edit(host);
        }
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

        if (user.getUserType() == Enum.valueOf(UserType.class, "GUEST")) {
            Guest guest = (Guest) this.get(user.getId());
            if (guest.getBlocked())
                return null;
        }
        else if (user.getUserType() == Enum.valueOf(UserType.class, "HOST")) {
            Host host = (Host) this.get(user.getId());
            if (host.getBlocked())
                return null;
        }

        return user;
    }

    @Override
    public Collection<HostViewOfUsers> getUsersByReservations(Host host) {
        host = (Host) userRepository.get(host.getId());
        ArrayList<HostViewOfUsers> ret = new ArrayList<>();
        List<Apartment> newList = new ArrayList<>();
        for (Apartment apartment : host.getApartments()) {
            newList.add(apartmentRepository.get(apartment.getId()));
        }
        host.setApartments(newList);


        for (Apartment apartment : host.getApartments()) {
            if (apartment == null)
                continue;
            for (Reservation reservation : apartment.getReservations()) {
                User user = reservation.getGuest();
                if (user == null)
                    continue;
                user = userRepository.get(user.getId());
                HostViewOfUsers hostViewOfUsers = new HostViewOfUsers(user.getUsername(), user.getFirstName(),
                        user.getLastName(), user.getSex(), user.getUserType(), apartment.getName(), reservation.getCheckInDate(), reservation.getNumberOfNights());
                ret.add(hostViewOfUsers);
            }
        }

        return ret;
    }
}

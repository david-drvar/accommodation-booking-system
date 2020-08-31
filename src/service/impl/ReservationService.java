package service.impl;

import beans.Apartment;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import service.IApartmentService;
import service.IReservationService;
import service.IUserService;

import java.util.ArrayList;
import java.util.Collection;

public class ReservationService implements IReservationService {

    IUserService userService;
    IApartmentService apartmentService;

    public ReservationService(IUserService userService, IApartmentService apartmentService) {
        this.userService = userService;
        this.apartmentService = apartmentService;
    }

    @Override
    public Collection<Reservation> getGuestReservations(long id) {
        Guest guest = (Guest) userService.get(id);
        return guest.getReservations();
    }

    @Override
    public Collection<Reservation> getHostReservations(long id) {
        Collection<Reservation> reservations = new ArrayList<>();
        apartmentService.getAll().forEach(x -> {
            if(x.getHost().getId() == id && !x.getReservations().isEmpty())
                reservations.addAll(x.getReservations());
        });
        return reservations;
    }

    @Override
    public Collection<Reservation> getAllReservations() {
        Collection<Reservation> allReservations = new ArrayList<>();
        apartmentService.getAll().forEach(x -> allReservations.addAll(x.getReservations()));
        return allReservations;
    }
}

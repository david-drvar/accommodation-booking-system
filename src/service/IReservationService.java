package service;

import beans.Reservation;
import beans.ReservationStatus;

import java.util.Collection;

public interface IReservationService {
    Collection<Reservation> getGuestReservations(long id);
    Collection<Reservation> getHostReservations(long id);
    Collection<Reservation> getAllReservations();
    void handleReservation(long reservationId, long apartmentId, ReservationStatus status);
}

package service;

import beans.Apartment;
import beans.Reservation;
import dto.ReservationDTO;

import java.text.ParseException;

public interface IApartmentService extends IService<Apartment> {
    Boolean reserve(ReservationDTO reservationDTO) throws ParseException;
    Boolean checkDates(ReservationDTO reservationDTO) throws ParseException;
    void setApartmentAvailableDates(Apartment entity);
    void retrieveAvailableDates(Apartment entity, Reservation reservation);
    void editWithDates(Apartment apartment);
}

package service;

import beans.Apartment;
import dto.ReservationDTO;

import java.text.ParseException;

public interface IApartmentService extends IService<Apartment> {
    Boolean reserve(ReservationDTO reservationDTO) throws ParseException;
    Boolean checkDates(ReservationDTO reservationDTO) throws ParseException;
}

package service.impl;

import beans.*;
import dto.ReservationDTO;
import repository.IApartmentRepository;
import repository.IUserRepository;
import service.IApartmentService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

public class ApartmentService implements IApartmentService {

    private final IApartmentRepository apartmentRepository;
    private final IUserRepository userRepository;

    public ApartmentService(IApartmentRepository apartmentRepository, IUserRepository userRepository) {
        this.apartmentRepository = apartmentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Apartment save(Apartment entity) {
        return apartmentRepository.save(entity);
    }

    @Override
    public void edit(Apartment entity) {
        apartmentRepository.edit(entity);
    }

    @Override
    public Apartment get(long id) {
        return apartmentRepository.get(id);
    }

    @Override
    public Collection<Apartment> getAll() {
        return apartmentRepository.getAll();
    }

    @Override
    public void delete(Apartment entity) {
        apartmentRepository.delete(entity);
    }

    @Override
    public Boolean reserve(ReservationDTO reservationDTO) throws ParseException {//yyyy-MM-dd
        Apartment apartment = this.get(reservationDTO.getApartmentId());
        Guest guest = (Guest) userRepository.get(reservationDTO.getGuestId());
        Apartment scaledApartment = new Apartment(apartment.getId());
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(reservationDTO.getCheckInDate());
        ReservationStatus status = Enum.valueOf(ReservationStatus.class, "CREATED");
        Reservation reservation = new Reservation(date, reservationDTO.getNumberOfNights(), reservationDTO.getTotalPrice(), reservationDTO.getNote(), status, guest, scaledApartment);

        apartment.getReservations().add(reservation);
        apartmentRepository.edit(apartment);

        Reservation scaledReservation = new Reservation(scaledApartment);
        guest.getReservations().add(scaledReservation);
        userRepository.edit(guest);

        return true;
    }
}

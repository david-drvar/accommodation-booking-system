package service.impl;

import beans.*;
import dto.ReservationDTO;
import repository.IApartmentRepository;
import repository.IUserRepository;
import service.IApartmentService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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

    private Date addDaysToDate(Date date, int days) {
        Date checkoutDate = new Date(date.getTime());
        Calendar c = Calendar.getInstance();
        c.setTime(checkoutDate);
        c.add(Calendar.DATE, days);
        checkoutDate = c.getTime();

        return checkoutDate;
    }

    private Boolean checkApartmentAvailability(Apartment apartment, Date checkInDate, int totalNights) {
        Date checkOutDate = addDaysToDate(checkInDate, totalNights);

        for(Reservation reservation : apartment.getReservations()) {
            Date fixedCheckOutDate = addDaysToDate(reservation.getCheckInDate(), reservation.getNumberOfNights());
            Date fixedCheckInDate = reservation.getCheckInDate();

            if (fixedCheckInDate.compareTo(checkInDate)<=0 && fixedCheckOutDate.compareTo(checkOutDate)>=0)
                return false;
            else if (fixedCheckInDate.compareTo(checkInDate)>=0 && checkOutDate.compareTo(fixedCheckInDate)>=0 && checkOutDate.compareTo(fixedCheckOutDate)<=0)
                return false;
            else if (checkInDate.compareTo(fixedCheckInDate)<=0 && checkOutDate.compareTo(fixedCheckOutDate)>=0)
                return false;
            else if (fixedCheckInDate.compareTo(checkInDate)<=0 && fixedCheckOutDate.compareTo(checkInDate)>=0 && fixedCheckOutDate.compareTo(checkOutDate)<=0)
                return false;
        }
        return true;
    }
//
//                if (fixedCheckInDate.before(checkInDate) && fixedCheckOutDate.after(checkOutDate) && fixedCheckOutDate.compareTo(checkInDate)>0)
//            return false;
//            else if (fixedCheckInDate.after(checkInDate) && checkOutDate.after(fixedCheckInDate) && checkOutDate.before(fixedCheckOutDate))
//            return false;
//            else if (checkInDate.before(fixedCheckInDate) && checkOutDate.after(fixedCheckOutDate))
//            return false;
//            else if (fixedCheckInDate.before(checkInDate) && fixedCheckOutDate.after(checkInDate) && fixedCheckOutDate.before(checkOutDate))
//            return false;

    public Boolean checkDates(ReservationDTO reservationDTO) throws ParseException {
        Apartment apartment = this.get(reservationDTO.getApartmentId());
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(reservationDTO.getCheckInDate());
        return checkApartmentAvailability(apartment, date, reservationDTO.getNumberOfNights());
    }

    @Override
    public Boolean reserve(ReservationDTO reservationDTO) throws ParseException {
        Apartment apartment = this.get(reservationDTO.getApartmentId());
        Guest guest = (Guest) userRepository.get(reservationDTO.getGuestId());
        Apartment scaledApartment = new Apartment(apartment.getId());
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(reservationDTO.getCheckInDate());
        ReservationStatus status = Enum.valueOf(ReservationStatus.class, "CREATED");
        Reservation reservation = new Reservation(date, reservationDTO.getNumberOfNights(), reservationDTO.getTotalPrice(), reservationDTO.getNote(), status, guest, scaledApartment);

        if (checkApartmentAvailability(apartment, date, reservationDTO.getNumberOfNights())) {
            apartment.getReservations().add(reservation);
            apartmentRepository.edit(apartment);

            Reservation scaledReservation = new Reservation(scaledApartment);
            guest.getReservations().add(scaledReservation);
            userRepository.edit(guest);

            return true;
        }
        return  false;
    }
}

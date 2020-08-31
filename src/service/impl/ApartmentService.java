package service.impl;

import beans.*;
import dto.ReservationDTO;
import repository.IApartmentRepository;
import repository.IUserRepository;
import service.IApartmentService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

public class ApartmentService implements IApartmentService {

    private final IApartmentRepository apartmentRepository;
    private final IUserRepository userRepository;

    public ApartmentService(IApartmentRepository apartmentRepository, IUserRepository userRepository) {
        this.apartmentRepository = apartmentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Apartment save(Apartment entity) {
        Apartment added = apartmentRepository.save(entity);

        Host host = (Host) userRepository.get(entity.getHost().getId());
        Apartment scaledApartment = new Apartment(added.getId());
        host.getApartments().add(scaledApartment);
        userRepository.edit(host);

        return added;
    }
    //moj izum
//ostavim sve kako jeste, dobijem size 0
    //jedan izbrisem, samo taj mi se vrati size 1
    //oba izbrisem oba mi se vrate size 2
    //izbrisem pa isti dodam

    //ilijin
    // oba izbrisem - oba mi se vrate size 2
    //

    @Override
    public void edit(Apartment entity) {
//        Apartment apartment = this.get(entity.getId());
//        apartment.setAmenities(entity.getAmenities());
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

    public void setApartmentAvailableDates(Apartment entity) {
        List<Date> availableDates = new ArrayList<>();
        entity.getRentDates().forEach(interval -> {
            Date start = interval.getStartDate();
            Date end = interval.getEndDate();
            while(start.before(end)) {
                availableDates.add(start);
                start = new Date(start.getTime() + 24 * 60 * 60 * 1000);
            }
        });
        entity.setAvailableDates(availableDates);
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
        //napravim listu datuma rezervacija
        //prolazim kroz tu listu i proveravam da li se svaki datum sadrzi u listi availableDates apartmana
        //ako se svaki sadrzi onda krecem da brisem svaki iz liste available dates i return true
        //ako se bar jedan ne sadrzi return false

        Date checkInDateCopy = new Date(checkInDate.getTime());
        Date checkOutDate = addDaysToDate(checkInDate, totalNights+1);
        ArrayList<Date> reservationDates = new ArrayList<>();
        while (checkInDateCopy.before(checkOutDate)) {
            reservationDates.add(checkInDateCopy);
            checkInDateCopy = new Date(checkInDateCopy.getTime() + 24 * 60 * 60 * 1000);
        }

        for (Date date : reservationDates)
            if (!apartment.getAvailableDates().contains(date))
                return false;

        return true;
    }

    public Boolean checkDates(ReservationDTO reservationDTO) throws ParseException {
        Apartment apartment = this.get(reservationDTO.getApartmentId());
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(reservationDTO.getCheckInDate());
        return checkApartmentAvailability(apartment, date, reservationDTO.getNumberOfNights());
    }

    private void deleteAvailableDates (Apartment apartment, Date checkInDate, int totalNights) {
        Date checkInDateCopy = new Date(checkInDate.getTime());
        Date checkOutDate = addDaysToDate(checkInDate, totalNights+1);
        ArrayList<Date> reservationDates = new ArrayList<>();
        while (checkInDateCopy.before(checkOutDate)) {
            reservationDates.add(checkInDateCopy);
            checkInDateCopy = new Date(checkInDateCopy.getTime() + 24 * 60 * 60 * 1000);
        }

        for (Date date : reservationDates)
            apartment.getAvailableDates().remove(date);
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
            deleteAvailableDates(apartment, date, reservationDTO.getNumberOfNights());
            apartment.getReservations().add(reservation);
            apartmentRepository.edit(apartment);

            reservation.setGuest(null);
            guest.getReservations().add(reservation);
            userRepository.edit(guest);

            return true;
        }
        return  false;
    }
}

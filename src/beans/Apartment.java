package beans;

import java.awt.*;
import java.util.Date;
import java.util.List;

public class Apartment {
   private long id;
   private ApartmentType type;
   private int roomNumber;
   private int guestNumber;
   private List<Date> rentDates;
   private List<Date> availableDates;
   private List<Image> images;
   private double pricePerNight;
   private Date checkIn;
   private Date checkOut;
   private Status status;
   
   private Location location;
   private List<ApartmentComment> apartmentComment;
   private List<Amenities> amenities;
   private Host host;
   private List<Reservation> reservation;

   public Apartment() {
   }

   public ApartmentType getType() {
      return type;
   }

   public void setType(ApartmentType type) {
      this.type = type;
   }

   public int getRoomNumber() {
      return roomNumber;
   }

   public void setRoomNumber(int roomNumber) {
      this.roomNumber = roomNumber;
   }

   public int getGuestNumber() {
      return guestNumber;
   }

   public void setGuestNumber(int guestNumber) {
      this.guestNumber = guestNumber;
   }

   public List<Date> getRentDates() {
      return rentDates;
   }

   public void setRentDates(List<Date> rentDates) {
      this.rentDates = rentDates;
   }

   public List<Date> getAvailableDates() {
      return availableDates;
   }

   public void setAvailableDates(List<Date> availableDates) {
      this.availableDates = availableDates;
   }

   public List<Image> getImages() {
      return images;
   }

   public void setImages(List<Image> images) {
      this.images = images;
   }

   public double getPricePerNight() {
      return pricePerNight;
   }

   public void setPricePerNight(double pricePerNight) {
      this.pricePerNight = pricePerNight;
   }

   public Date getCheckIn() {
      return checkIn;
   }

   public void setCheckIn(Date checkIn) {
      this.checkIn = checkIn;
   }

   public Date getCheckOut() {
      return checkOut;
   }

   public void setCheckOut(Date checkOut) {
      this.checkOut = checkOut;
   }

   public Status getStatus() {
      return status;
   }

   public void setStatus(Status status) {
      this.status = status;
   }

   public Location getLocation() {
      return location;
   }

   public void setLocation(Location location) {
      this.location = location;
   }

   public List<ApartmentComment> getApartmentComment() {
      return apartmentComment;
   }

   public void setApartmentComment(List<ApartmentComment> apartmentComment) {
      this.apartmentComment = apartmentComment;
   }

   public List<Amenities> getAmenities() {
      return amenities;
   }

   public void setAmenities(List<Amenities> amenities) {
      this.amenities = amenities;
   }

   public Host getHost() {
      return host;
   }

   public void setHost(Host host) {
      this.host = host;
   }

   public List<Reservation> getReservation() {
      return reservation;
   }

   public void setReservation(List<Reservation> reservation) {
      this.reservation = reservation;
   }
}
package beans;

import repository.bounds.Deletable;
import repository.bounds.Identifiable;

import java.awt.*;
import java.util.Date;
import java.util.List;

public class Apartment implements Identifiable, Deletable {
   private long id;
   private ApartmentType type;
   private int roomNumber;
   private int guestNumber;
   private List<Date> rentDates;
   private List<Date> availableDates;
   private List<Image> images;
   private double pricePerNight;
   private String checkIn;
   private String checkOut;
   private Status status;
   
   private Location location;
   private List<ApartmentComment> apartmentComments;
   private List<Amenity> amenities;
   private Host host;
   private List<Reservation> reservations;
   private Boolean isActive;

   public Apartment() {
   }

   public Apartment(long id) {
      this.id = id;
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

   public String getCheckIn() {
      return checkIn;
   }

   public void setCheckIn(String checkIn) {
      this.checkIn = checkIn;
   }

   public String getCheckOut() {
      return checkOut;
   }

   public void setCheckOut(String checkOut) {
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

   public List<ApartmentComment> getApartmentComments() {
      return apartmentComments;
   }

   public void setApartmentComments(List<ApartmentComment> apartmentComments) {
      this.apartmentComments = apartmentComments;
   }

   public List<Amenity> getAmenities() {
      return amenities;
   }

   public void setAmenities(List<Amenity> amenities) {
      this.amenities = amenities;
   }

   public Host getHost() {
      return host;
   }

   public void setHost(Host host) {
      this.host = host;
   }

   public List<Reservation> getReservations() {
      return reservations;
   }

   public void setReservations(List<Reservation> reservations) {
      this.reservations = reservations;
   }

   @Override
   public void setId(long id) {
      this.id = id;
   }

   @Override
   public long getId() {
      return this.id;
   }

   @Override
   public void setIsActive(Boolean isActive) {
      this.isActive = isActive;
   }

   @Override
   public Boolean getIsActive() {
      return this.isActive;
   }
}
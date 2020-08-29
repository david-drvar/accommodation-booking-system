
package beans;

import repository.bounds.Identifiable;

import java.util.Date;

public class Reservation implements Identifiable {
   private Date checkInDate;
   private int numberOfNights = 1;
   private double totalPrice;
   private String note;
   private ReservationStatus status;
   private long id;
   
   private Guest guest;
   private Apartment apartment;

   public Reservation() {
   }

   public Reservation(Apartment apartment) {
      this.apartment = apartment;
   }

   public Reservation(Date checkInDate, int numberOfNights, double totalPrice, String note, ReservationStatus status, Guest guest, Apartment apartment) {
      this.checkInDate = checkInDate;
      this.numberOfNights = numberOfNights;
      this.totalPrice = totalPrice;
      this.note = note;
      this.status = status;
      this.guest = guest;
      this.apartment = apartment;
   }

   public Date getCheckInDate() {
      return checkInDate;
   }

   public void setCheckInDate(Date checkInDate) {
      this.checkInDate = checkInDate;
   }

   public int getNumberOfNights() {
      return numberOfNights;
   }

   public void setNumberOfNights(int numberOfNights) {
      this.numberOfNights = numberOfNights;
   }

   public double getTotalPrice() {
      return totalPrice;
   }

   public void setTotalPrice(double totalPrice) {
      this.totalPrice = totalPrice;
   }

   public String getNote() {
      return note;
   }

   public void setNote(String note) {
      this.note = note;
   }

   public ReservationStatus getStatus() {
      return status;
   }

   public void setStatus(ReservationStatus status) {
      this.status = status;
   }

   public Guest getGuest() {
      return guest;
   }

   public void setGuest(Guest guest) {
      this.guest = guest;
   }

   public Apartment getApartment() {
      return apartment;
   }

   public void setApartment(Apartment apartment) {
      this.apartment = apartment;
   }

   @Override
   public void setId(long id) {
      this.id = id;
   }

   @Override
   public long getId() {
      return this.id;
   }
}
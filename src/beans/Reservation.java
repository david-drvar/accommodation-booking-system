
package beans;

import java.util.*;

public class Reservation {
   private Date checkInDate;
   private int numberOfNights = 1;
   private double totalPrice;
   private String note;
   private ReservationStatus status;
   
   private Guest guest;
   private Apartment apartment;
   
   
   public Guest getGuest() {
      return guest;
   }
   
   public void setGuest(Guest newGuest) {
      if (this.guest == null || !this.guest.equals(newGuest))
      {
         if (this.guest != null)
         {
            Guest oldGuest = this.guest;
            this.guest = null;
            oldGuest.removeReservation(this);
         }
         if (newGuest != null)
         {
            this.guest = newGuest;
            this.guest.addReservation(this);
         }
      }
   }
   public Apartment getApartment() {
      return apartment;
   }
   
   public void setApartment(Apartment newApartment) {
      if (this.apartment == null || !this.apartment.equals(newApartment))
      {
         if (this.apartment != null)
         {
            Apartment oldApartment = this.apartment;
            this.apartment = null;
            oldApartment.removeReservation(this);
         }
         if (newApartment != null)
         {
            this.apartment = newApartment;
            this.apartment.addReservation(this);
         }
      }
   }

}
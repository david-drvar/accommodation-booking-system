/***********************************************************************
 * Module:  Guest.java
 * Author:  Asus
 * Purpose: Defines the Class Guest
 ***********************************************************************/

package beans;

import java.util.*;

public class Guest extends User {
   private java.util.List<Reservation> reservation;
   
   
   public java.util.List<Reservation> getReservation() {
      if (reservation == null)
         reservation = new java.util.ArrayList<Reservation>();
      return reservation;
   }
   
   public java.util.Iterator getIteratorReservation() {
      if (reservation == null)
         reservation = new java.util.ArrayList<Reservation>();
      return reservation.iterator();
   }
   
   public void setReservation(java.util.List<Reservation> newReservation) {
      removeAllReservation();
      for (java.util.Iterator iter = newReservation.iterator(); iter.hasNext();)
         addReservation((Reservation)iter.next());
   }
   
   public void addReservation(Reservation newReservation) {
      if (newReservation == null)
         return;
      if (this.reservation == null)
         this.reservation = new java.util.ArrayList<Reservation>();
      if (!this.reservation.contains(newReservation))
      {
         this.reservation.add(newReservation);
         newReservation.setGuest(this);      
      }
   }
   
   public void removeReservation(Reservation oldReservation) {
      if (oldReservation == null)
         return;
      if (this.reservation != null)
         if (this.reservation.contains(oldReservation))
         {
            this.reservation.remove(oldReservation);
            oldReservation.setGuest((Guest)null);
         }
   }
   
   public void removeAllReservation() {
      if (reservation != null)
      {
         Reservation oldReservation;
         for (java.util.Iterator iter = getIteratorReservation(); iter.hasNext();)
         {
            oldReservation = (Reservation)iter.next();
            iter.remove();
            oldReservation.setGuest((Guest)null);
         }
      }
   }

}
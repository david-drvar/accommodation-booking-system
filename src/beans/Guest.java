package beans;

import java.util.List;

public class Guest extends User {
   private List<Reservation> reservation;

   public Guest() {
      super();
   }

   public Guest(String username, String password, String firstName, String lastName, Sex sex, List<Reservation> reservation) {
      super(username, password, firstName, lastName, sex);
      this.reservation = reservation;
   }

   public List<Reservation> getReservation() {
      return reservation;
   }

   public void setReservation(List<Reservation> reservation) {
      this.reservation = reservation;
   }
}
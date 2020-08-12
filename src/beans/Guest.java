package beans;

import java.util.List;

public class Guest extends User {
   private List<Reservation> reservations;

   public Guest() {
      super();
   }

   public Guest(List<Reservation> reservations) {
      this.reservations = reservations;
   }

   public Guest(String username, String password, String firstName, String lastName, Sex sex, Boolean isActive, UserType userType, List<Reservation> reservations) {
      super(username, password, firstName, lastName, sex, isActive, userType);
      this.reservations = reservations;
   }

   public List<Reservation> getReservations() {
      return reservations;
   }

   public void setReservations(List<Reservation> reservations) {
      this.reservations = reservations;
   }
}
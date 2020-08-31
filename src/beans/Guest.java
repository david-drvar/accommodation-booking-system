package beans;

import java.util.List;

public class Guest extends User {
   private List<Reservation> reservations;
   private Boolean isBlocked;

   public Guest() {
      super();
   }

   public Guest(List<Reservation> reservations, Boolean isBlocked) {
      this.reservations = reservations;
      this.isBlocked = isBlocked;
   }

   public Guest(String username, String password, String firstName, String lastName, Sex sex, Boolean isActive, UserType userType, List<Reservation> reservations, Boolean isBlocked) {
      super(username, password, firstName, lastName, sex, isActive, userType);
      this.reservations = reservations;
      this.isBlocked = isBlocked;
   }

   public List<Reservation> getReservations() {
      return reservations;
   }

   public void setReservations(List<Reservation> reservations) {
      this.reservations = reservations;
   }

   public Boolean getBlocked() {
      return isBlocked;
   }

   public void setBlocked(Boolean blocked) {
      isBlocked = blocked;
   }
}
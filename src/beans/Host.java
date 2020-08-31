package beans;

import java.util.List;

public class Host extends User {
   private List<Apartment> apartments;
   private Boolean isBlocked;

   public Host() {
   }

   public Host(List<Apartment> apartments, Boolean isBlocked) {
      this.apartments = apartments;
      this.isBlocked = isBlocked;
   }

   public Host(String username, String password, String firstName, String lastName, Sex sex, Boolean isActive, UserType userType, List<Apartment> apartments, Boolean isBlocked) {
      super(username, password, firstName, lastName, sex, isActive, userType);
      this.apartments = apartments;
      this.isBlocked = isBlocked;
   }

   public List<Apartment> getApartments() {
      return apartments;
   }

   public void setApartments(List<Apartment> apartments) {
      this.apartments = apartments;
   }

   public Boolean getBlocked() {
      return isBlocked;
   }

   public void setBlocked(Boolean blocked) {
      isBlocked = blocked;
   }
}
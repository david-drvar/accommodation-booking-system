package beans;

import java.util.List;

public class Host extends User {
   private List<Apartment> apartments;

   public Host() {
   }

   public Host(List<Apartment> apartments) {
      this.apartments = apartments;
   }

   public Host(String username, String password, String firstName, String lastName, Sex sex, Boolean isActive, UserType userType, List<Apartment> apartments) {
      super(username, password, firstName, lastName, sex, isActive, userType);
      this.apartments = apartments;
   }

   public List<Apartment> getApartments() {
      return apartments;
   }

   public void setApartments(List<Apartment> apartments) {
      this.apartments = apartments;
   }
}
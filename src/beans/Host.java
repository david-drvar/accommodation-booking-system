package beans;

import java.util.List;

public class Host extends User {
   private List<Apartment> apartment;

   public Host() {
   }

   public Host(List<Apartment> apartment) {
      this.apartment = apartment;
   }

   public Host(String username, String password, String firstName, String lastName, Sex sex, Boolean isActive, UserType userType, List<Apartment> apartment) {
      super(username, password, firstName, lastName, sex, isActive, userType);
      this.apartment = apartment;
   }

   public List<Apartment> getApartment() {
      return apartment;
   }

   public void setApartment(List<Apartment> apartment) {
      this.apartment = apartment;
   }
}
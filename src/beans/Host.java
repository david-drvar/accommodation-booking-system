package beans;

import java.util.*;

public class Host extends User {
   private java.util.List<Apartment> apartment;

   public Host() {
   }

   public Host(String username, String password, String firstName, String lastName, Sex sex, List<Apartment> apartment) {
      super(username, password, firstName, lastName, sex);
      this.apartment = apartment;
   }

   public List<Apartment> getApartment() {
      return apartment;
   }

   public void setApartment(List<Apartment> apartment) {
      this.apartment = apartment;
   }
}
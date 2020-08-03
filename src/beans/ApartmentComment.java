package beans;

import beans.Apartment;
import beans.Guest;

import java.util.*;

public class ApartmentComment {
   private String content;
   private int grade;
   
   private Guest guest;
   private Apartment apartment;
   
   
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
            oldApartment.removeApartmentComment(this);
         }
         if (newApartment != null)
         {
            this.apartment = newApartment;
            this.apartment.addApartmentComment(this);
         }
      }
   }

}
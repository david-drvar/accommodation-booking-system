package beans;

import java.util.*;

public class Host extends User {
   private java.util.List<Apartment> apartment;
   
   
   public java.util.List<Apartment> getApartment() {
      if (apartment == null)
         apartment = new java.util.ArrayList<Apartment>();
      return apartment;
   }
   
   public java.util.Iterator getIteratorApartment() {
      if (apartment == null)
         apartment = new java.util.ArrayList<Apartment>();
      return apartment.iterator();
   }
   

   public void setApartment(java.util.List<Apartment> newApartment) {
      removeAllApartment();
      for (java.util.Iterator iter = newApartment.iterator(); iter.hasNext();)
         addApartment((Apartment)iter.next());
   }
   

   public void addApartment(Apartment newApartment) {
      if (newApartment == null)
         return;
      if (this.apartment == null)
         this.apartment = new java.util.ArrayList<Apartment>();
      if (!this.apartment.contains(newApartment))
      {
         this.apartment.add(newApartment);
         newApartment.setHost(this);      
      }
   }
   

   public void removeApartment(Apartment oldApartment) {
      if (oldApartment == null)
         return;
      if (this.apartment != null)
         if (this.apartment.contains(oldApartment))
         {
            this.apartment.remove(oldApartment);
            oldApartment.setHost((Host)null);
         }
   }
   

   public void removeAllApartment() {
      if (apartment != null)
      {
         Apartment oldApartment;
         for (java.util.Iterator iter = getIteratorApartment(); iter.hasNext();)
         {
            oldApartment = (Apartment)iter.next();
            iter.remove();
            oldApartment.setHost((Host)null);
         }
      }
   }

}
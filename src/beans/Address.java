package beans;

import java.util.*;

public class Address {
   private String street;
   private String number;
   
   private Town town;
   
   
   public Town getTown() {
      return town;
   }

   public void setTown(Town newTown) {
      if (this.town == null || !this.town.equals(newTown))
      {
         if (this.town != null)
         {
            Town oldTown = this.town;
            this.town = null;
            oldTown.removeAddress(this);
         }
         if (newTown != null)
         {
            this.town = newTown;
            this.town.addAddress(this);
         }
      }
   }

}
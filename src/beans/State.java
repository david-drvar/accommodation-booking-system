package beans;

import java.util.*;

public class State {
   private String name;
   
   private java.util.List<Town> town;
   
   
   public java.util.List<Town> getTown() {
      if (town == null)
         town = new java.util.ArrayList<Town>();
      return town;
   }
   
   public java.util.Iterator getIteratorTown() {
      if (town == null)
         town = new java.util.ArrayList<Town>();
      return town.iterator();
   }
   

   public void setTown(java.util.List<Town> newTown) {
      removeAllTown();
      for (java.util.Iterator iter = newTown.iterator(); iter.hasNext();)
         addTown((Town)iter.next());
   }
   

   public void addTown(Town newTown) {
      if (newTown == null)
         return;
      if (this.town == null)
         this.town = new java.util.ArrayList<Town>();
      if (!this.town.contains(newTown))
      {
         this.town.add(newTown);
         newTown.setState(this);      
      }
   }

   public void removeTown(Town oldTown) {
      if (oldTown == null)
         return;
      if (this.town != null)
         if (this.town.contains(oldTown))
         {
            this.town.remove(oldTown);
            oldTown.setState((State)null);
         }
   }
   

   public void removeAllTown() {
      if (town != null)
      {
         Town oldTown;
         for (java.util.Iterator iter = getIteratorTown(); iter.hasNext();)
         {
            oldTown = (Town)iter.next();
            iter.remove();
            oldTown.setState((State)null);
         }
      }
   }

}
package beans;

import java.util.*;

public class Town {
   private String name;
   private int postalNumber;
   
   private State state;
   private java.util.List<Address> address;
   
   
   public State getState() {
      return state;
   }
   
   public void setState(State newState) {
      if (this.state == null || !this.state.equals(newState))
      {
         if (this.state != null)
         {
            State oldState = this.state;
            this.state = null;
            oldState.removeTown(this);
         }
         if (newState != null)
         {
            this.state = newState;
            this.state.addTown(this);
         }
      }
   }
   public java.util.List<Address> getAddress() {
      if (address == null)
         address = new java.util.ArrayList<Address>();
      return address;
   }
   
   public java.util.Iterator getIteratorAddress() {
      if (address == null)
         address = new java.util.ArrayList<Address>();
      return address.iterator();
   }
   
   public void setAddress(java.util.List<Address> newAddress) {
      removeAllAddress();
      for (java.util.Iterator iter = newAddress.iterator(); iter.hasNext();)
         addAddress((Address)iter.next());
   }
   
   public void addAddress(Address newAddress) {
      if (newAddress == null)
         return;
      if (this.address == null)
         this.address = new java.util.ArrayList<Address>();
      if (!this.address.contains(newAddress))
      {
         this.address.add(newAddress);
         newAddress.setTown(this);      
      }
   }
   
   public void removeAddress(Address oldAddress) {
      if (oldAddress == null)
         return;
      if (this.address != null)
         if (this.address.contains(oldAddress))
         {
            this.address.remove(oldAddress);
            oldAddress.setTown((Town)null);
         }
   }
   
   public void removeAllAddress() {
      if (address != null)
      {
         Address oldAddress;
         for (java.util.Iterator iter = getIteratorAddress(); iter.hasNext();)
         {
            oldAddress = (Address)iter.next();
            iter.remove();
            oldAddress.setTown((Town)null);
         }
      }
   }

}
package beans;

import java.util.List;

public class Town {
   private String name;
   private int postalNumber;
   
   private State state;
   private List<Address> address;

   public Town() {
   }

   public Town(String name, int postalNumber, State state, List<Address> address) {
      this.name = name;
      this.postalNumber = postalNumber;
      this.state = state;
      this.address = address;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public int getPostalNumber() {
      return postalNumber;
   }

   public void setPostalNumber(int postalNumber) {
      this.postalNumber = postalNumber;
   }

   public State getState() {
      return state;
   }

   public void setState(State state) {
      this.state = state;
   }

   public List<Address> getAddress() {
      return address;
   }

   public void setAddress(List<Address> address) {
      this.address = address;
   }
}
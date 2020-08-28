package beans;

public class Address {
   private String street;
   private String number;
   private String state;
   private Town town;

   public Address() {
   }

   public String getStreet() {
      return street;
   }

   public void setStreet(String street) {
      this.street = street;
   }

   public String getNumber() {
      return number;
   }

   public void setNumber(String number) {
      this.number = number;
   }

   public Town getTown() {
      return town;
   }

   public void setTown(Town town) {
      this.town = town;
   }

   public String getState() {
      return state;
   }

   public void setState(String state) {
      this.state = state;
   }
}
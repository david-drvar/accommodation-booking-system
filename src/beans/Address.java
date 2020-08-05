package beans;

public class Address {
   private String street;
   private String number;
   private long id;
   private Town town;

   public Address() {
   }

   public Address(String street, String number, Town town) {
      this.street = street;
      this.number = number;
      this.town = town;
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
}
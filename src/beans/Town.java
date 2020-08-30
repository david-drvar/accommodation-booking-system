package beans;

public class Town {
   private String name;
   private String postalNumber;

   public Town() {
   }

   public Town(String name, String postalNumber) {
      this.name = name;
      this.postalNumber = postalNumber;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getPostalNumber() {
      return postalNumber;
   }

   public void setPostalNumber(String postalNumber) {
      this.postalNumber = postalNumber;
   }

}
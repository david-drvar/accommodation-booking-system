package beans;

public class Town {
   private String name;
   private int postalNumber;

   public Town() {
   }

   public Town(String name, int postalNumber) {
      this.name = name;
      this.postalNumber = postalNumber;
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

}
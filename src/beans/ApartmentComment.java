package beans;

public class ApartmentComment {
   private String content;
   private int grade;
   private long id;
   private Guest guest;
   private Apartment apartment;

   public ApartmentComment() {
   }

   public ApartmentComment(String content, int grade, Guest guest, Apartment apartment) {
      this.content = content;
      this.grade = grade;
      this.guest = guest;
      this.apartment = apartment;
   }

   public String getContent() {
      return content;
   }

   public void setContent(String content) {
      this.content = content;
   }

   public int getGrade() {
      return grade;
   }

   public void setGrade(int grade) {
      this.grade = grade;
   }

   public Guest getGuest() {
      return guest;
   }

   public void setGuest(Guest guest) {
      this.guest = guest;
   }

   public Apartment getApartment() {
      return apartment;
   }

   public void setApartment(Apartment apartment) {
      this.apartment = apartment;
   }
}
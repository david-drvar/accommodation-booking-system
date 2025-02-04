package beans;


public class ApartmentComment {
   private String content;
   private int grade;
   private Guest guest;
   private Apartment apartment;
   private CommentStatus status = CommentStatus.PENDING;

   public ApartmentComment() {
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

   public CommentStatus getStatus() {
      return status;
   }

   public void setStatus(CommentStatus status) {
      this.status = status;
   }
}
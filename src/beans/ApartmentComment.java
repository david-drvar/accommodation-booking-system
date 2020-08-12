package beans;

public class ApartmentComment {
   private String content;
   private int grade;
   private Guest guest;
   private Boolean isActive;

   public ApartmentComment() {
   }

   public ApartmentComment(String content, int grade, Guest guest, Boolean isActive) {
      this.content = content;
      this.grade = grade;
      this.guest = guest;
      this.isActive = isActive;
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

   public Boolean getActive() {
      return isActive;
   }

   public void setActive(Boolean active) {
      isActive = active;
   }

}
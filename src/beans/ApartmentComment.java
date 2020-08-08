package beans;

import repository.Identifiable;

public class ApartmentComment implements Identifiable {
   private String content;
   private int grade;
   private long id;
   private Guest guest;
   private Apartment apartment;
   private Boolean isActive;

   public ApartmentComment() {
   }

   public ApartmentComment(String content, int grade, long id, Guest guest, Apartment apartment, Boolean isActive) {
      this.content = content;
      this.grade = grade;
      this.id = id;
      this.guest = guest;
      this.apartment = apartment;
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

   public Apartment getApartment() {
      return apartment;
   }

   public void setApartment(Apartment apartment) {
      this.apartment = apartment;
   }

   public Boolean getActive() {
      return isActive;
   }

   public void setActive(Boolean active) {
      isActive = active;
   }

   @Override
   public void setId(long id) {
      this.id = id;
   }

   @Override
   public long getId() {
      return this.id;
   }
}
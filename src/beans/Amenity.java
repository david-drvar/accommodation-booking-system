package beans;

import repository.Identifiable;

public class Amenity implements Identifiable {
   private long id;
   private String name;
   private Boolean isActive;

   public Amenity() {
   }

   public Amenity(long id, String name) {
      this.id = id;
      this.name = name;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   @Override
   public void setId(long id) { this.id = id; }

   @Override
   public long getId() {
      return this.id;
   }

   public Boolean getActive() {
      return isActive;
   }

   public void setActive(Boolean active) {
      isActive = active;
   }
}
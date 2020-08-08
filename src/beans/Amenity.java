package beans;

import repository.bounds.Deletable;
import repository.bounds.Identifiable;

public class Amenity implements Identifiable, Deletable {
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

   @Override
   public void setIsActive(Boolean isActive) {
      this.isActive = isActive;
   }

   @Override
   public Boolean getIsActive() {
      return isActive;
   }
}
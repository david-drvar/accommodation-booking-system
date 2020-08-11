package beans;

import repository.bounds.Deletable;
import repository.bounds.Identifiable;

import java.util.List;

public class State implements Identifiable, Deletable {
   private String name;
   private List<Town> towns;
   private Boolean isActive;
   private long id;


   public State() {
   }

   public State(String name, List<Town> towns) {
      this.name = name;
      this.towns = towns;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public List<Town> getTowns() {
      return towns;
   }

   public void setTowns(List<Town> towns) {
      this.towns = towns;
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
package beans;

import java.util.*;

public class State {
   private String name;
   
   private List<Town> town;

   public State() {
   }

   public State(String name, List<Town> town) {
      this.name = name;
      this.town = town;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public List<Town> getTown() {
      return town;
   }

   public void setTown(List<Town> town) {
      this.town = town;
   }
}
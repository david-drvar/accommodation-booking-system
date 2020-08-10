package beans;

import repository.bounds.Deletable;
import repository.bounds.Identifiable;

public class User implements Identifiable, Deletable {
   protected String username;
   protected String password;
   protected String firstName;
   protected String lastName;
   protected Sex sex;
   protected long id;
   protected Boolean isActive;
   protected UserType userType;

   public User() {
   }

   public User(String username, String password, String firstName, String lastName, Sex sex, Boolean isActive, UserType userType) {
      this.username = username;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.sex = sex;
      this.isActive = isActive;
      this.userType = userType;
   }

   public User(String username, String password, String firstName, String lastName, Sex sex, long id, Boolean isActive, UserType userType) {
      this.username = username;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.sex = sex;
      this.id = id;
      this.isActive = isActive;
      this.userType = userType;
   }

   public String getUsername() {
      return username;
   }

   public void setUsername(String username) {
      this.username = username;
   }

   public String getPassword() {
      return password;
   }

   public void setPassword(String password) {
      this.password = password;
   }

   public String getFirstName() {
      return firstName;
   }

   public void setFirstName(String firstName) {
      this.firstName = firstName;
   }

   public String getLastName() {
      return lastName;
   }

   public void setLastName(String lastName) {
      this.lastName = lastName;
   }

   public Sex getSex() {
      return sex;
   }

   public void setSex(Sex sex) {
      this.sex = sex;
   }

   @Override
   public void setId(long id) {
      this.id = id;
   }

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

   public UserType getUserType() {
      return userType;
   }

   public void setUserType(UserType userType) {
      this.userType = userType;
   }
}
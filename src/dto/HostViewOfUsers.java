package dto;

import beans.Sex;
import beans.UserType;

import java.util.Date;

public class HostViewOfUsers {
    //userType, first name, lastName, sex, username, apartman name, checkIn, checkOut
    String username;
    String firstName;
    String lastName;
    Sex sex;
    UserType userType;
    String apartmentName;
    Date checkInDate;
    int totalNights;

    public HostViewOfUsers(String username, String firstName, String lastName, Sex sex, UserType userType, String apartmentName, Date checkInDate, int totalNights) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sex = sex;
        this.userType = userType;
        this.apartmentName = apartmentName;
        this.checkInDate = checkInDate;
        this.totalNights = totalNights;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Sex getSex() {
        return sex;
    }

    public UserType getUserType() {
        return userType;
    }

    public String getApartmentName() {
        return apartmentName;
    }

    public Date getCheckInDate() {
        return checkInDate;
    }

    public int getTotalNights() {
        return totalNights;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public void setApartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    public void setTotalNights(int totalNights) {
        this.totalNights = totalNights;
    }
}

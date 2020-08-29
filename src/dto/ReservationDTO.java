package dto;

import java.util.Date;

public class ReservationDTO {
    private long apartmentId;
    private String checkInDate;
    private int numberOfNights;
    private double totalPrice;
    private String note;
    private long guestId;

    public ReservationDTO(long apartmentId, String checkInDate, int numberOfNights, double totalPrice, String note, long guestId) {
        this.apartmentId = apartmentId;
        this.checkInDate = checkInDate;
        this.numberOfNights = numberOfNights;
        this.totalPrice = totalPrice;
        this.note = note;
        this.guestId = guestId;
    }

    public ReservationDTO() {
    }

    public long getApartmentId() {
        return apartmentId;
    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public int getNumberOfNights() {
        return numberOfNights;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public String getNote() {
        return note;
    }

    public long getGuestId() {
        return guestId;
    }

    public void setApartmentId(long apartmentId) {
        this.apartmentId = apartmentId;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public void setNumberOfNights(int numberOfNights) {
        this.numberOfNights = numberOfNights;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setGuestId(long guestId) {
        this.guestId = guestId;
    }
}

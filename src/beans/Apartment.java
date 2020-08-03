package beans;

import java.util.*;

public class Apartment {
   private ApartmentType type;
   private int roomNumber;
   private int guestNumber;
   private Date[] rentDates;
   private Date[] avaliableDates;
   private java.lang.Object[] images;
   private double pricePerNight;
   private Date checkIn;
   private Date checkOut;
   private Status status;
   
   private Location location;
   private java.util.List<ApartmentComment> apartmentComment;
   private java.util.List<Amenities> amenities;
   private Host host;
   private java.util.List<Reservation> reservation;
   
   
   public java.util.List<ApartmentComment> getApartmentComment() {
      if (apartmentComment == null)
         apartmentComment = new java.util.ArrayList<ApartmentComment>();
      return apartmentComment;
   }
   
   public java.util.Iterator getIteratorApartmentComment() {
      if (apartmentComment == null)
         apartmentComment = new java.util.ArrayList<ApartmentComment>();
      return apartmentComment.iterator();
   }
   
   public void setApartmentComment(java.util.List<ApartmentComment> newApartmentComment) {
      removeAllApartmentComment();
      for (java.util.Iterator iter = newApartmentComment.iterator(); iter.hasNext();)
         addApartmentComment((ApartmentComment)iter.next());
   }
   
   public void addApartmentComment(ApartmentComment newApartmentComment) {
      if (newApartmentComment == null)
         return;
      if (this.apartmentComment == null)
         this.apartmentComment = new java.util.ArrayList<ApartmentComment>();
      if (!this.apartmentComment.contains(newApartmentComment))
      {
         this.apartmentComment.add(newApartmentComment);
         newApartmentComment.setApartment(this);      
      }
   }
   
   public void removeApartmentComment(ApartmentComment oldApartmentComment) {
      if (oldApartmentComment == null)
         return;
      if (this.apartmentComment != null)
         if (this.apartmentComment.contains(oldApartmentComment))
         {
            this.apartmentComment.remove(oldApartmentComment);
            oldApartmentComment.setApartment((Apartment)null);
         }
   }
   
   public void removeAllApartmentComment() {
      if (apartmentComment != null)
      {
         ApartmentComment oldApartmentComment;
         for (java.util.Iterator iter = getIteratorApartmentComment(); iter.hasNext();)
         {
            oldApartmentComment = (ApartmentComment)iter.next();
            iter.remove();
            oldApartmentComment.setApartment((Apartment)null);
         }
      }
   }
   public java.util.List<Amenities> getAmenities() {
      if (amenities == null)
         amenities = new java.util.ArrayList<Amenities>();
      return amenities;
   }
   
   public java.util.Iterator getIteratorAmenities() {
      if (amenities == null)
         amenities = new java.util.ArrayList<Amenities>();
      return amenities.iterator();
   }
   
   public void setAmenities(java.util.List<Amenities> newAmenities) {
      removeAllAmenities();
      for (java.util.Iterator iter = newAmenities.iterator(); iter.hasNext();)
         addAmenities((Amenities)iter.next());
   }
   
   public void addAmenities(Amenities newAmenities) {
      if (newAmenities == null)
         return;
      if (this.amenities == null)
         this.amenities = new java.util.ArrayList<Amenities>();
      if (!this.amenities.contains(newAmenities))
         this.amenities.add(newAmenities);
   }
   
   public void removeAmenities(Amenities oldAmenities) {
      if (oldAmenities == null)
         return;
      if (this.amenities != null)
         if (this.amenities.contains(oldAmenities))
            this.amenities.remove(oldAmenities);
   }
   
   public void removeAllAmenities() {
      if (amenities != null)
         amenities.clear();
   }
   public Host getHost() {
      return host;
   }
   
   public void setHost(Host newHost) {
      if (this.host == null || !this.host.equals(newHost))
      {
         if (this.host != null)
         {
            Host oldHost = this.host;
            this.host = null;
            oldHost.removeApartment(this);
         }
         if (newHost != null)
         {
            this.host = newHost;
            this.host.addApartment(this);
         }
      }
   }
   public java.util.List<Reservation> getReservation() {
      if (reservation == null)
         reservation = new java.util.ArrayList<Reservation>();
      return reservation;
   }
   
   public java.util.Iterator getIteratorReservation() {
      if (reservation == null)
         reservation = new java.util.ArrayList<Reservation>();
      return reservation.iterator();
   }
   
   public void setReservation(java.util.List<Reservation> newReservation) {
      removeAllReservation();
      for (java.util.Iterator iter = newReservation.iterator(); iter.hasNext();)
         addReservation((Reservation)iter.next());
   }
   
   public void addReservation(Reservation newReservation) {
      if (newReservation == null)
         return;
      if (this.reservation == null)
         this.reservation = new java.util.ArrayList<Reservation>();
      if (!this.reservation.contains(newReservation))
      {
         this.reservation.add(newReservation);
         newReservation.setApartment(this);      
      }
   }
   
   public void removeReservation(Reservation oldReservation) {
      if (oldReservation == null)
         return;
      if (this.reservation != null)
         if (this.reservation.contains(oldReservation))
         {
            this.reservation.remove(oldReservation);
            oldReservation.setApartment((Apartment)null);
         }
   }
   
   public void removeAllReservation() {
      if (reservation != null)
      {
         Reservation oldReservation;
         for (java.util.Iterator iter = getIteratorReservation(); iter.hasNext();)
         {
            oldReservation = (Reservation)iter.next();
            iter.remove();
            oldReservation.setApartment((Apartment)null);
         }
      }
   }

}
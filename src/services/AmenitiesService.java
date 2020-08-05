package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import beans.Amenities;
import repository.AmenitiesRepository;

import java.awt.*;

@Path("/amenities")
public class AmenitiesService {
   
    @Path("/test")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test() {
        return "Test";
    }
    
    @Path("/save")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String save() {
        AmenitiesRepository amenitiesRepository = new AmenitiesRepository();
        Amenities amenity = new Amenities();
        amenity.setName("pro1wab11a");
        amenity.setId("id");
        amenitiesRepository.save(amenity);
        return "Success";
    }


}

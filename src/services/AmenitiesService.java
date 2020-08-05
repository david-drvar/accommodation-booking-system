package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Amenities;
import repository.AmenitiesRepository;

import java.awt.*;

@Path("/amenities")
public class AmenitiesService {
   
	@Context
	ServletContext context;
	
	public AmenitiesService() {
	}

	@PostConstruct
	public void init() {
		
	}
	
    @Path("/test")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test() {
        return "Test";
    }
    
    @Path("/save")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String save(Amenities amenity) {
        AmenitiesRepository amenitiesRepository = new AmenitiesRepository();
        System.out.println(context.getRealPath(""));
        amenitiesRepository.save(amenity, context.getRealPath(""));
        return "Success";
    }


}

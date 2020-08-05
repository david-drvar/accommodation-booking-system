package repository;

import beans.Amenities;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;


public class AmenitiesRepository {
	
    public void save(Amenities amenity, String path) {
        ObjectMapper mapper = new ObjectMapper();
        
        File file = new File(path + "/resources/tekst.txt");

        
        try(PrintWriter printWritter = new PrintWriter(new OutputStreamWriter(new FileOutputStream(file, true))))
        {
        	System.out.println(file.getCanonicalPath());
        	printWritter.println(mapper.writeValueAsString(amenity));
        }
        catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
    }
}

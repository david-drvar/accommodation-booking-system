package repository;

import beans.Amenities;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;

public class AmenitiesRepository {

    public void save(Amenities amenity) {
        ObjectMapper mapper = new ObjectMapper();
        try {
      	String json = mapper.writeValueAsString(amenity);
      File file=new File("C:\\Users\\david\\Desktop\\backup\\amenities.json");
      file.createNewFile();  
      FileWriter fileWriter = new FileWriter(file, true);  
      	fileWriter.append(json);
      	fileWriter.close();
        }
        catch (Exception ignored) {

        }
    }
}

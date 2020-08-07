package repository;

import beans.Amenity;
import repository.json.stream.IJSONStream;


public class AmenitiesRepository extends JSONRepository<Amenity> {

    public AmenitiesRepository(IJSONStream<Amenity> stream, ISequencer sequencer) {
        super(stream, sequencer);
    }


//    public void save(Amenity amenity, String path) {

//        ObjectMapper mapper = new ObjectMapper();
//
//        File file = new File(path + "/resources/tekst.txt");
//
//
//        try(PrintWriter printWritter = new PrintWriter(new OutputStreamWriter(new FileOutputStream(file, true))))
//        {
//        	System.out.println(file.getCanonicalPath());
//        	printWritter.println(mapper.writeValueAsString(amenity));
//        }
//        catch (JsonGenerationException e) {
//			e.printStackTrace();
//		} catch (JsonMappingException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		
    //}
}

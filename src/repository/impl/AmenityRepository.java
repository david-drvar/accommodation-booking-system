package repository.impl;

import beans.Amenity;
import repository.IAmenityRepository;
import repository.json.JSONRepository;
import repository.json.stream.IJSONStream;


public class AmenityRepository extends JSONRepository<Amenity> implements IAmenityRepository {

    public AmenityRepository(IJSONStream<Amenity> stream) {
        super(stream);
    }

}

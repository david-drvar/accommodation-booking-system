package repository.impl;

import beans.Apartment;
import repository.IApartmentRepository;
import repository.json.JSONRepository;
import repository.json.stream.IJSONStream;

public class ApartmentRepository extends JSONRepository<Apartment> implements IApartmentRepository {
    public ApartmentRepository(IJSONStream<Apartment> stream) {
        super(stream);
    }
}

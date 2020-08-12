package repository;

import beans.Apartment;
import repository.json.JSONRepository;
import repository.json.stream.IJSONStream;

public class ApartmentRepository extends JSONRepository<Apartment> implements IApartmentRepository {
    public ApartmentRepository(IJSONStream<Apartment> stream) {
        super(stream);
    }
}

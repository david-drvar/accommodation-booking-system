package service;

import beans.Amenity;
import repository.IAmenityRepository;

import java.util.Collection;

public class AmenityService implements IAmenityService{
    private IAmenityRepository amenityRepository;

    public AmenityService(IAmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    @Override
    public Amenity save(Amenity entity) {
        return amenityRepository.save(entity);
    }

    @Override
    public void edit(Amenity entity) {
        amenityRepository.edit(entity);
    }

    @Override
    public Amenity get(long id) {
        return amenityRepository.get(id);
    }

    @Override
    public Collection<Amenity> getAll() {
        return amenityRepository.getAll();
    }

    @Override
    public void delete(Amenity entity) {
        amenityRepository.delete(entity);
    }
}

package service.impl;

import beans.Amenity;
import beans.Apartment;
import repository.IAmenityRepository;
import repository.IApartmentRepository;
import service.IAmenityService;

import java.util.Collection;

public class AmenityService implements IAmenityService {
    private final IAmenityRepository amenityRepository;
    private final IApartmentRepository apartmentRepository;

    public AmenityService(IAmenityRepository amenityRepository, IApartmentRepository apartmentRepository) {
        this.amenityRepository = amenityRepository;
        this.apartmentRepository = apartmentRepository;
    }

    @Override
    public Amenity save(Amenity entity) {
        return amenityRepository.save(entity);
    }

    @Override
    public void edit(Amenity entity) {
        amenityRepository.edit(entity);
        for (Apartment apartment : apartmentRepository.getAll()) {
            for (Amenity amenity : apartment.getAmenities()) {
                if (amenity.getId() == entity.getId())
                    amenity.setName(entity.getName());
            }
            apartmentRepository.edit(apartment);
        }
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
        for (Apartment apartment : apartmentRepository.getAll()) {
            if (apartment.getAmenities().removeIf(amenity -> amenity.getId() == entity.getId()))
                apartmentRepository.edit(apartment);
        }
    }
}

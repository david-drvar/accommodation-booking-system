package service.impl;

import beans.Apartment;
import repository.IApartmentRepository;
import service.IApartmentService;

import java.util.Collection;

public class ApartmentService implements IApartmentService {

    private final IApartmentRepository apartmentRepository;

    public ApartmentService(IApartmentRepository apartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }

    @Override
    public Apartment save(Apartment entity) {
        return apartmentRepository.save(entity);
    }

    @Override
    public void edit(Apartment entity) {
        apartmentRepository.edit(entity);
    }

    @Override
    public Apartment get(long id) {
        return apartmentRepository.get(id);
    }

    @Override
    public Collection<Apartment> getAll() {
        return apartmentRepository.getAll();
    }

    @Override
    public void delete(Apartment entity) {
        apartmentRepository.delete(entity);
    }
}

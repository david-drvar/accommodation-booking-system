package service.impl;

import beans.Holiday;
import repository.IHolidayRepository;
import service.IHolidayService;

import java.util.Collection;

public class HolidayService implements IHolidayService {
    private final IHolidayRepository holidayRepository;

    public HolidayService(IHolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }

    @Override
    public Holiday save(Holiday entity) {
        return holidayRepository.save(entity);
    }

    @Override
    public void edit(Holiday entity) {
        holidayRepository.edit(entity);
    }

    @Override
    public Holiday get(long id) {
        return holidayRepository.get(id);
    }

    @Override
    public Collection<Holiday> getAll() {
        return holidayRepository.getAll();
    }

    @Override
    public void delete(Holiday entity) {
        holidayRepository.delete(entity);
    }
}

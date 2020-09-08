package service.impl;

import beans.Amenity;
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

    @Override
    public Boolean checkNameOrDateValid(Holiday holiday) {
        if (this.getAll() == null)
            return true;
        for (Holiday h : this.getAll()) {
            if (h.getName().equals(holiday.getName()))
                return false;
            else if (h.getDate().compareTo(holiday.getDate())==0)
                return false;
        }
        return true;
    }
}

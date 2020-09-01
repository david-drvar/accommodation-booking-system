package repository.impl;

import beans.Holiday;
import repository.IHolidayRepository;
import repository.json.JSONRepository;
import repository.json.stream.IJSONStream;

public class HolidayRepository extends JSONRepository<Holiday> implements IHolidayRepository {
    public HolidayRepository(IJSONStream<Holiday> stream) {
        super(stream);
    }
}

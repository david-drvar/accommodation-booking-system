package service;

import beans.Holiday;

public interface IHolidayService extends IService<Holiday> {
    Boolean checkNameOrDateValid(Holiday holiday);
}

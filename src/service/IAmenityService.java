package service;

import beans.Amenity;

public interface IAmenityService extends IService<Amenity>{
    Boolean checkNameValid(Amenity amenity);
}

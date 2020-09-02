package service;

import beans.Apartment;
import beans.ApartmentComment;
import beans.Host;

import java.util.ArrayList;
import java.util.Collection;

public class ApartmentCommentService implements IApartmentCommentService{
    IApartmentService apartmentService;

    public ApartmentCommentService(IApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    @Override
    public Collection<ApartmentComment> getCommentsByHostId(long id) {
        Collection<ApartmentComment> comments = new ArrayList<>();
        Collection<Apartment> apartments = apartmentService.getAll();
        if(apartments != null)
            apartments.forEach(x -> {
                if(x.getHost().getId() == id && !x.getApartmentComments().isEmpty())
                    comments.addAll(x.getApartmentComments());
            });
        return comments;
    }

    @Override
    public Collection<ApartmentComment> getAllComments() {
        Collection<ApartmentComment> comments = new ArrayList<>();
        Collection<Apartment> apartments = apartmentService.getAll();
        if(apartments != null)
            apartments.forEach(x -> comments.addAll(x.getApartmentComments()));
        return comments;
    }
}

package service;

import beans.ApartmentComment;
import beans.Host;

import java.util.Collection;

public interface IApartmentCommentService {
    Collection<ApartmentComment> getCommentsByHostId(long id);
    Collection<ApartmentComment> getAllComments();
    void editCommentStatus(ApartmentComment comment);
}

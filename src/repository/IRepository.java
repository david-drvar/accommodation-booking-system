package repository;

import exceptions.EntityNotFoundException;

import java.util.Collection;

public interface IRepository<T extends Identifiable> {
    T save(T entity);
    void edit(T entity) throws EntityNotFoundException;
    T get(long id) throws EntityNotFoundException;
    Iterable<T> getAll();
    void delete(T entity) throws EntityNotFoundException;
}

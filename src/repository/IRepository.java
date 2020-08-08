package repository;

import repository.bounds.Identifiable;

import java.util.Collection;

public interface IRepository<T extends Identifiable> {
    T save(T entity);
    void edit(T entity);
    T get(long id);
    Collection<T> getAll();
    void delete(T entity);
}

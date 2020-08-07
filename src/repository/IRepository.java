package repository;

import java.util.Collection;

public interface IRepository<T extends Identifiable> {
    T save(T entity);
    void edit(T entity);
    T get(long id);
    Iterable<T> getAll();
    void delete(T entity);
}

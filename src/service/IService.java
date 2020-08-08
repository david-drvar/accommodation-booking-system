package service;

import java.util.Collection;

public interface IService<T> {
    T save(T entity);
    void edit(T entity);
    T get(long id);
    Collection<T> getAll();
    void delete(T entity);
}

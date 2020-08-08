package repository.json.stream;

import java.util.Collection;

public interface IJSONStream<T> {
    void saveAll(Collection<T> entities);
    Collection<T> readAll();
    void appendToFile(T entity);
}

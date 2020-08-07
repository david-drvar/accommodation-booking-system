package repository.json.stream;

import java.util.Collection;

public interface IJSONStream<T> {
    void saveAll(Iterable<T> entities);
    Iterable<T> readAll();
    void appendToFile(T entity);
}

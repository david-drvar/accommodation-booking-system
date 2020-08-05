package repository.json.stream;

public interface IJSONStream<T> {

    void saveAll(Iterable<T> entities);

    Iterable<T> readAll();

    void appendToFile(T entity);
}

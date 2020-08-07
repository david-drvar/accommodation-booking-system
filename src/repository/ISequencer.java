package repository;

public interface ISequencer {
    void initialize(long id);
    long generateId();
}

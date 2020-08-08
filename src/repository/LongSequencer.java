package repository;

public class LongSequencer {
    private long id;

    public void initialize(long id) {
        this.id = id;
    }
    public long generateId() {
        return ++id;
    }
}

package repository;

public class LongSequencer implements ISequencer {
    private long id;

    @Override
    public void initialize(long id) {
        this.id = id;
    }

    @Override
    public long generateId() {
        return ++id;
    }
}

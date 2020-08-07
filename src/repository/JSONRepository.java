package repository;

import repository.json.stream.IJSONStream;

import java.util.ArrayList;
import java.util.Collections;

public class JSONRepository<T extends Identifiable>
        implements IRepository<T>{
    IJSONStream<T> stream;
    ISequencer sequencer;

    public JSONRepository(IJSONStream<T> stream, ISequencer sequencer) {
        this.stream = stream;
        this.sequencer = sequencer;
        initializeID();
    }

    private void initializeID() {
        sequencer.initialize(findMax(stream.readAll()));
    }

    private long findMax(Iterable<T> entities) {
        if(entities == null)
            return 0l;
        ArrayList<Long> ids = new ArrayList<>();
        entities.forEach(x -> ids.add(x.getId()));
        return Collections.max(ids);
    }

    @Override
    public T save(T entity) {
        entity.setId(sequencer.generateId());
        stream.appendToFile(entity);
        return entity;
    }

    @Override
    public void edit(T entity) {

    }

    @Override
    public T get(long id) {
        return null;
    }

    @Override
    public Iterable<T> getAll() {
        return null;
    }

    @Override
    public void delete(T entity) {

    }
}

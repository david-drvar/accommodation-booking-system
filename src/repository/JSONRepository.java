package repository;

import exceptions.EntityNotFoundException;
import repository.json.stream.IJSONStream;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class JSONRepository<T extends Identifiable>
        implements IRepository<T>{
    IJSONStream<T> stream;
    LongSequencer sequencer;

    public JSONRepository(IJSONStream<T> stream) {
        this.stream = stream;
        this.sequencer = new LongSequencer();
        initializeID();
    }

    private void initializeID() {
        sequencer.initialize(findMax(stream.readAll()));
    }

    private long findMax(Iterable<T> entities) {
        if(entities == null)
            return 0l;
        List<Long> ids = new ArrayList<>();
        entities.forEach(x -> ids.add(x.getId()));
        //for(T t : entities) ids.add(t.getId());
        return Collections.max(ids);
    }

    @Override
    public T save(T entity) {
        entity.setId(sequencer.generateId());
        stream.appendToFile(entity);
        return entity;
    }

    @Override
    public void edit(T entity) throws EntityNotFoundException {
        ArrayList<T> all = (ArrayList<T>) stream.readAll();
        if(all == null)
            throw new EntityNotFoundException(entity.getId());
        for(int i = 0; i < all.size(); i++)
            if(all.get(i).getId() == entity.getId()) {
                all.set(i, entity);
                break;
            }
        stream.saveAll(all);
    }

    @Override
    public T get(long id) {
        Iterable<T> entities = stream.readAll();
        if(entities == null)
            return null;
        for(T entity : entities) {
            if (entity.getId() == id)
                return entity;
        }
        return null;
    }

    @Override
    public Iterable<T> getAll() {
        return stream.readAll();
    }

    @Override
    public void delete(T entity) {
    }
}

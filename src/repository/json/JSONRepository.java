package repository.json;

import repository.IRepository;
import repository.bounds.Deletable;
import repository.bounds.Identifiable;
import repository.json.sequencer.LongSequencer;
import repository.json.stream.IJSONStream;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class JSONRepository<T extends Identifiable & Deletable>
        implements IRepository<T> {
    IJSONStream<T> stream;
    LongSequencer sequencer;

    public JSONRepository(IJSONStream<T> stream) {
        this.stream = stream;
        this.sequencer = new LongSequencer();
        initializeID();
    }

    private void initializeID() {
        sequencer.initialize(findMax(getAll()));
    }

    private long findMax(Collection<T> entities) {
        if(entities == null)
            return 0l;
        List<Long> ids = new ArrayList<>();
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
        ArrayList<T> all = (ArrayList<T>) stream.readAll();
        if(all == null) return;
        for(int i = 0; i < all.size(); i++)
            if(all.get(i).getId() == entity.getId() && all.get(i).getIsActive()) {
                all.set(i, entity);
                break;
            }
        stream.saveAll(all);
    }

    @Override
    public T get(long id) {
        Collection<T> entities = getAll();
        if(entities == null)
            return null;
        return entities.stream().filter(x -> x.getId() == id).findFirst().orElse(null);
//        for(T entity : entities) {
//            if (entity.getId() == id)
//                return entity;
//        }
//        return null;
    }

    @Override
    public Collection<T> getAll() {
        Collection<T> entities = stream.readAll();
        if (entities == null)
            return null;
        List<T> activeEntities = entities.stream().filter(x -> x.getIsActive()).collect(Collectors.toList());
        return (activeEntities.size() == 0) ? null : activeEntities;
    }

    @Override
    public void delete(T entity) {
        entity.setIsActive(false);
        edit(entity);
    }
}

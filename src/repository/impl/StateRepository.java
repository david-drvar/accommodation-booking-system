package repository.impl;

import beans.Amenity;
import beans.State;
import repository.IStateRepository;
import repository.json.JSONRepository;
import repository.json.stream.IJSONStream;

import java.util.Collection;

public class StateRepository extends JSONRepository<State> implements IStateRepository {

    public StateRepository(IJSONStream<State> stream) {
        super(stream);
    }
}

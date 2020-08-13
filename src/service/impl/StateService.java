package service.impl;

import beans.State;
import repository.IStateRepository;
import service.IStateService;

import java.util.Collection;

public class StateService implements IStateService {

    private final IStateRepository stateRepository;

    public StateService(IStateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @Override
    public State save(State entity) {
        return null;
    }

    @Override
    public void edit(State entity) {

    }

    @Override
    public State get(long id) {
        return stateRepository.get(id);
    }

    @Override
    public Collection<State> getAll() {
        return stateRepository.getAll();
    }

    @Override
    public void delete(State entity) {

    }
}

package exceptions;

public class EntityNotFoundException extends Exception{
    public EntityNotFoundException(String message) {
        super(message);
    }

    public EntityNotFoundException(long entityId) {
        super("Entity with id = " + entityId + " could not be found.");
    }

}

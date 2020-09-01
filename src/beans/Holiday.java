package beans;

import repository.bounds.Deletable;
import repository.bounds.Identifiable;

import java.util.Date;

public class Holiday implements Identifiable, Deletable {
    private long id;
    private String name;
    private Date date;
    private Boolean isActive;

    public Holiday() {
    }

    public Holiday(long id, String name, Date date, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.isActive = isActive;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    @Override
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public Boolean getIsActive() {
        return this.isActive;
    }

    @Override
    public void setId(long id) {
        this.id = id;
    }

    @Override
    public long getId() {
        return this.id;
    }
}

package repository.json.stream;

import beans.Amenity;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import javafx.print.Collation;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class JSONStream<T> implements IJSONStream<T> {
    private String path;
    private Gson converter;
    private Type type;

    public JSONStream(String path, Type type) {
        this.path = path;
        this.converter = new GsonBuilder().setPrettyPrinting().create();
        this.type = type;
    }

    @Override
    public void saveAll(Collection<T> entities) {
        try(PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(new FileOutputStream(path)))) {
            converter.toJson(entities, printWriter);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Collection<T> readAll() {
        List<T> entities = null;
        try(BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(path)))) {
            entities = converter.fromJson(bufferedReader, type);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return entities;
    }

    @Override
    public void appendToFile(T entity) {
        ArrayList<T> entities = (ArrayList<T>) readAll();
        if(entities == null)
            entities = new ArrayList<>();
        entities.add(entity);
        saveAll(entities);
    }
}

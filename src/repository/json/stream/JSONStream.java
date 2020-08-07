package repository.json.stream;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class JSONStream<T> implements IJSONStream<T> {
    private String path;
    private Gson converter;

    public JSONStream(String path) {
        this.path = path;
        this.converter = new Gson();
    }

    @Override
    public void saveAll(Iterable<T> entities) {
        try(PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(new FileOutputStream(path)))) {
            entities.forEach(entity -> printWriter.println(converter.toJson(entity)));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Iterable<T> readAll() {
        Iterable<T> entities = null;
        try(BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(path)))) {
            entities = converter.fromJson(bufferedReader, new TypeToken<List<T>>(){}.getType());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return entities;
    }

    @Override
    public void appendToFile(T entity) {
        try(PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(new FileOutputStream(path, true)))) {
            printWriter.println(converter.toJson(entity));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}

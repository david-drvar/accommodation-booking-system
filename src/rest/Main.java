package rest;

import beans.Amenity;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import repository.AmenitiesRepository;
import repository.json.stream.JSONStream;

import java.io.File;
import java.util.List;

import static spark.Spark.*;

public class Main {

    //paths
    private static final String AMENITIES_FILE_PATH = "./static/resources/amenities.json";


    private static Gson converter = new Gson();

    public static void main(String[] args) throws Exception {

        port(8088);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        AmenitiesRepository amenitiesRepository = new AmenitiesRepository(
                new JSONStream<Amenity>(AMENITIES_FILE_PATH, new TypeToken<List<Amenity>>(){}.getType()));

        get("/rest/demo/test", (req, res) -> {
            return "Works IntelliJ!";
        });

        post("/amenities/save", (req, res) -> {
            String json = req.body();
            Amenity amenity = converter.fromJson(json, Amenity.class);
            amenitiesRepository.save(amenity);
            return "OK";
        });

        get("/amenities/getAll", (req, res) -> {
            res.type("application/json");
            return converter.toJson(amenitiesRepository.getAll());
        });

        get("/amenities/getOne/:id", (req, res) -> {
            res.type("application/json");
            long id = Long.parseLong(req.params("id"));
            return converter.toJson(amenitiesRepository.get(id));
        });

        post("amenities/edit", (req, res)->{
            String json = req.body();
            Amenity amenity = converter.fromJson(json, Amenity.class);
            amenitiesRepository.edit(amenity);
            return "OK";
        });

        delete("amenities/delete", (req, res) -> {
            String json = req.body();
            Amenity amenity = converter.fromJson(json, Amenity.class);
            amenitiesRepository.delete(amenity);
            return "OK";
        });
    }
}

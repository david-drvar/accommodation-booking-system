package rest;

import beans.Amenity;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import repository.AmenitiesRepository;
import repository.json.stream.JSONStream;
//import ws.WsHandler;

import java.io.File;
import java.util.List;

import static spark.Spark.*;

public class Main {

    private static Gson g = new Gson();

    public static void main(String[] args) throws Exception {

        port(8088);

        //webSocket("/ws", WsHandler.class);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        AmenitiesRepository repo = new AmenitiesRepository(
                new JSONStream<Amenity>("./static/resources/amenities.json", new TypeToken<List<Amenity>>(){}.getType()));

        get("/rest/demo/test", (req, res) -> {
            return "Works IntelliJ!";
        });

        post("/rest/demo/save", (req, res) -> {
            String json = req.body();
            Amenity amenity = g.fromJson(json, Amenity.class);
            repo.save(amenity);
            return "OK";
        });

        get("/getAll", (req, res) -> {
            res.type("application/json");
            return g.toJson(repo.getAll());
        });

        get("/getOne/:id", (req, res) -> {
            long id = Long.parseLong(req.params("id"));
            return g.toJson(repo.get(id));
        });

        post("/edit", (req, res)->{
            String json = req.body();
            Amenity amenity = g.fromJson(json, Amenity.class);
            repo.edit(amenity);
            return "OK";
        });
    }
}

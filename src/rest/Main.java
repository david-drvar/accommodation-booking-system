package rest;

import beans.Amenity;
import com.google.gson.Gson;
import repository.AmenitiesRepository;
import repository.LongSequencer;
import repository.json.stream.JSONStream;
//import ws.WsHandler;

import java.io.File;

import static spark.Spark.*;

public class Main {

    private static Gson g = new Gson();

    public static void main(String[] args) throws Exception {

        port(8088);

        //webSocket("/ws", WsHandler.class);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        AmenitiesRepository repo = new AmenitiesRepository(
                new JSONStream<Amenity>("./static/resources/amenities.json"), new LongSequencer());

        get("/rest/demo/test", (req, res) -> {
            return "Works IntelliJ!";
        });

        post("/rest/demo/save", (req, res) -> {
            String json = req.body();
            Amenity amenity = g.fromJson(json, Amenity.class);
            repo.save(amenity);
            return "OK";
        });
    }
}

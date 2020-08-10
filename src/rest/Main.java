package rest;

import adapter.RuntimeTypeAdapterFactory;
import beans.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import repository.AmenityRepository;
import repository.IAmenityRepository;
import repository.IUserRepository;
import repository.UserRepository;
import repository.json.stream.JSONStream;
import service.AmenityService;
import service.IAmenityService;
import service.IUserService;
import service.UserService;

import java.io.File;
import java.util.List;

import static spark.Spark.*;

public class Main {

    //paths
    private static final String AMENITIES_FILE_PATH = "./static/resources/amenities.json";
    private static final String USERS_FILE_PATH = "./static/resources/users.json";

    private static final Gson converter = new Gson();

    private static IAmenityService amenityService;
    private static IUserService userService;

    public static void main(String[] args) throws Exception {

        port(8088);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        configure();

        get("/rest/demo/test", (req, res) -> {
            return "Works IntelliJ!";
        });

        post("/amenities/save", (req, res) -> {
            String json = req.body();
            Amenity amenity = converter.fromJson(json, Amenity.class);
            amenityService.save(amenity);
            return "OK";
        });

        get("/amenities/getAll", (req, res) -> {
            res.type("application/json");
            return converter.toJson(amenityService.getAll());
        });

        get("/amenities/getOne/:id", (req, res) -> {
            res.type("application/json");
            long id = Long.parseLong(req.params("id"));
            return converter.toJson(amenityService.get(id));
        });

        post("amenities/edit", (req, res)->{
            String json = req.body();
            Amenity amenity = converter.fromJson(json, Amenity.class);
            amenityService.edit(amenity);
            return "OK";
        });

        delete("amenities/delete", (req, res) -> {
            String json = req.body();
            Amenity amenity = converter.fromJson(json, Amenity.class);
            amenityService.delete(amenity);
            return "OK";
        });



        get("/users/getAll", (req, res) -> {
            res.type("application/json");
            return converter.toJson(userService.getAll());
        });

        get("/users/getOne/:id", (req, res) -> {
            res.type("application/json");
            long id = Long.parseLong(req.params("id"));
            return converter.toJson(userService.get(id));
        });

        post("/users/save", (req, res) -> {
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            if (user.getUserType() == UserType.ADMIN) {
                Admin admin = converter.fromJson(json, Admin.class);
                userService.save(admin);
            }
            return "OK";
        });

        post("/users/checkUsername", (req, res) -> {
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            if (userService.checkUsernameUnique(user.getUsername())) {
                return "OK";
            }
            return "ERROR";
        });

        post("users/edit", (req, res)->{
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            if (user.getUserType() == UserType.ADMIN) {
                Admin admin = converter.fromJson(json, Admin.class);
                userService.edit(admin);
            }
            //userService.edit(user);
            return "OK";
        });

        delete("users/delete", (req, res) -> {
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            if (user.getUserType() == UserType.ADMIN) {
                Admin admin = converter.fromJson(json, Admin.class);
                userService.delete(admin);
            }
            //userService.delete(user);
            return "OK";
        });

        post("/login", (req, res) -> {
            res.type("application/json");
            String username = req.queryParams("username");
            String password = req.queryParams("password");
            User user = userService.login(username, password);
            return converter.toJson(user);
        });
    }

    private static void configure() {
        IAmenityRepository amenityRepository = new AmenityRepository(
                new JSONStream<Amenity>(AMENITIES_FILE_PATH, new TypeToken<List<Amenity>>(){}.getType()));
        amenityService = new AmenityService(amenityRepository);

        IUserRepository userRepository = new UserRepository(
                new JSONStream<User>(USERS_FILE_PATH, new TypeToken<List<User>>(){}.getType(), RuntimeTypeAdapterFactory.of(User.class, "userType")
                        .registerSubtype(Guest.class, "GUEST")
                        .registerSubtype(Admin.class, "ADMIN")
                        .registerSubtype(Host.class, "HOST")));
        userService = new UserService(userRepository);
    }
}

package rest;

import adapter.RuntimeTypeAdapterFactory;
import beans.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import dto.ReservationDTO;
import imageUtil.ImageUpload;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import repository.*;
import repository.impl.*;
import repository.json.stream.JSONStream;
import service.*;
import service.impl.*;

import javax.servlet.MultipartConfigElement;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.Part;
import java.io.File;
import java.io.FileOutputStream;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import static spark.Spark.*;

public class Main {

    //paths
    private static final String AMENITIES_FILE_PATH = "./static/resources/amenities.json";
    private static final String USERS_FILE_PATH = "./static/resources/users.json";
    private static final String STATES_FILE_PATH = "./static/resources/states.json";
    private static final String APARTMENTS_FILE_PATH = "./static/resources/apartments.json";
    private static final String HOLIDAYS_FILE_PATH = "./static/resources/holidays.json";
    private static final String IMAGE_UPLOAD_FOLDER_PATH = "./static/pics";

    static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final Gson converter = new GsonBuilder()
            .setDateFormat("yyyy-MM-dd")
            .create();

    private static IAmenityService amenityService;
    private static IUserService userService;
    private static IStateService stateService;
    private static IApartmentService apartmentService;
    private static IReservationService reservationService;
    private static IHolidayService holidayService;

    private static ImageUpload imageUpload;

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
//            String auth = req.headers("Authorization");
//            System.out.println("Authorization: " + auth);
//            if ((auth != null) && (auth.contains("Bearer "))) {
//                String jwt = auth.substring(auth.indexOf("Bearer ") + 7);
//                try {
//                    Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
//                    return converter.toJson(amenityService.getAll());
//                    //return "User " + claims.getBody().getSubject() + " logged in.";
//                } catch (Exception e) {
//                    System.out.println(e.getMessage());
//                }
//            }
//            res.status(403);
//            return "No user logged in.";

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

        post("/users/save", (req, res) -> { //TODO David: Koja je razlika izmedju save i register
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            if (user.getUserType() == UserType.ADMIN) {
                Admin admin = converter.fromJson(json, Admin.class);
                userService.save(admin);
            }
            else if (user.getUserType() == UserType.HOST) {
                Host host = converter.fromJson(json, Host.class);
                userService.save(host);
            }
            else if (user.getUserType() == UserType.GUEST) {
                Guest guest = converter.fromJson(json, Guest.class);
                userService.save(guest);
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

        post("/users/block", (req, res) -> {
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            userService.blockUser(user);
            return "OK";
        });

        post("/users/unblock", (req, res) -> {
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            userService.unblockUser(user);
            return "OK";
        });

        post("users/edit", (req, res)->{
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            if (user.getUserType() == UserType.ADMIN) {
                Admin admin = converter.fromJson(json, Admin.class);
                userService.edit(admin);
            }
            else if (user.getUserType() == UserType.HOST) {
                Host admin = converter.fromJson(json, Host.class);
                userService.edit(admin);
            }
            else if (user.getUserType() == UserType.GUEST) {
                Guest admin = converter.fromJson(json, Guest.class);
                userService.edit(admin);
            }
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
            if (user != null) {
                String jws = Jwts.builder().setSubject("{ \"id\" : " + user.getId() + ", \"userType\" : \"" + user.getUserType() + "\" }").setExpiration(new Date(new Date().getTime() + 1000*100000L)).setIssuedAt(new Date()).signWith(key).compact();
                res.body(jws);
                System.out.println("Returned JWT: " + jws);
                return jws;
            }
            else {
                res.status(404);
                return res;
            }
        });

        post("/register", (req, res) -> {
            res.type("application/json");
            String json = req.body();
            User user = converter.fromJson(json, User.class);
            if (user != null) {
                if (user.getUserType() == UserType.ADMIN) {
                    Admin admin = converter.fromJson(json, Admin.class);
                    userService.save(admin);
                }
                else if (user.getUserType() == UserType.HOST) {
                    Host host = converter.fromJson(json, Host.class);
                    userService.save(host);
                }
                else if (user.getUserType() == UserType.GUEST) {
                    Guest guest = converter.fromJson(json, Guest.class);
                    userService.save(guest);
                }
                String jws = Jwts.builder().setSubject("{ \"id\" : " + user.getId() + ", \"userType\" : \"" + user.getUserType() + "\" }").setExpiration(new Date(new Date().getTime() + 1000*100000L)).setIssuedAt(new Date()).signWith(key).compact();
                res.body(jws);
                System.out.println("Returned JWT: " + jws);
                return jws;
            }
            else {
                res.status(404);
                return res;
            }
        });

        get("/state/getAll", (req, res) -> {
            res.type("application/json");
            return converter.toJson(stateService.getAll());
        });

        get("/state/getOne/:id", (req, res) -> {
            res.type("application/json");
            long id = Long.parseLong(req.params("id"));
            return converter.toJson(stateService.get(id));
        });

        get("/apartment/getAll", (req, res) -> {
            res.type("application/json");
            return converter.toJson(apartmentService.getAll());
        });

        get("/apartment/getOne/:id", (req, res) -> {
            res.type("application/json");
            long id = Long.parseLong(req.params("id"));
            return converter.toJson(apartmentService.get(id));
        });

        post("/apartment/save", (req, res) -> {
            String payload = req.body();
            Apartment apartment = converter.fromJson(payload, Apartment.class);
            if(!apartment.getRentDates().isEmpty())
                apartmentService.setApartmentAvailableDates(apartment);
            res.type("application/json");
            return converter.toJson(apartmentService.save(apartment));
        });

        post("/apartment/edit", (req, res) -> {
            String payload = req.body();
            Apartment apartment = converter.fromJson(payload, Apartment.class);
            res.type("application/json");
            apartmentService.edit(apartment);
            return "OK";
        });

        delete("/apartment/delete", (req, res) -> {
            String payload = req.body();
            Apartment apartment = converter.fromJson(payload, Apartment.class);
            res.type("application/json");
            Apartment completeApartment = apartmentService.get(apartment.getId());
            apartmentService.delete(completeApartment);
            return "OK";
        });

        post("/apartment/new-reservation/checkAvailability", (req, res) -> {
            String payload = req.body();
            ReservationDTO reservationDTO = converter.fromJson(payload, ReservationDTO.class);
            res.type("application/json");
            if (apartmentService.checkDates(reservationDTO)) {
                res.status(200);
                return "Ok";
            }
            res.status(400);
            return "Ok";
        });

        post("/apartment/new-reservation/save", (req, res) -> {
            String payload = req.body();
            ReservationDTO reservationDTO = converter.fromJson(payload, ReservationDTO.class);
            res.type("application/json");
            if (apartmentService.reserve(reservationDTO)) {
                res.status(200);
                return "Ok";
            }
            res.status(400);
            return "Ok";
        });

        post("/users/get-users-by-host", (req, res) -> {
            res.type("application/json");
            String payload = req.body();
            Host host = (Host) converter.fromJson(payload, Host.class);
            return converter.toJson(userService.getUsersByReservations(host));
        });

        post("/image/upload", (req, res) -> {
            try {
                imageUpload.uploadImage(req);
                return "OK";
            } catch (Exception e) {
                res.status(400);
                return "Error while uploading an image!";
            }
        });

        get("/reservation/guest/:id", (req, res) -> {
            res.type("application/json");
            long id = Long.parseLong(req.params("id"));
            return converter.toJson(reservationService.getGuestReservations(id));
        });

        get("/reservation/host/:id", (req, res) -> {
            res.type("application/json");
            long id = Long.parseLong(req.params("id"));
            return converter.toJson(reservationService.getHostReservations(id));
        });

        get("reservation/admin", (req, res) -> {
            res.type("application/json");
            return converter.toJson(reservationService.getAllReservations());
        });

        post("/holidays/save", (req, res) -> {
            String json = req.body();
            Holiday holiday = converter.fromJson(json, Holiday.class);
            holidayService.save(holiday);
            return "OK";
        });

        post("/holidays/edit", (req, res) -> {
            String json = req.body();
            Holiday holiday = converter.fromJson(json, Holiday.class);
            holidayService.edit(holiday);
            return "OK";
        });

        delete("/holidays/delete", (req, res) -> {
            String json = req.body();
            Holiday holiday = converter.fromJson(json, Holiday.class);
            holidayService.delete(holiday);
            return "OK";
        });

        get("/holidays/getAll", (req, res) -> {
            res.type("application/json");
            return converter.toJson(holidayService.getAll());
        });
    }

    private static void configure() {
        IUserRepository userRepository = new UserRepository(
                new JSONStream<User>(USERS_FILE_PATH, new TypeToken<List<User>>(){}.getType(), RuntimeTypeAdapterFactory.of(User.class, "userType")
                        .registerSubtype(Guest.class, "GUEST")
                        .registerSubtype(Admin.class, "ADMIN")
                        .registerSubtype(Host.class, "HOST")));
        userService = new UserService(userRepository);

        IStateRepository stateRepository = new StateRepository(
                new JSONStream<State>(STATES_FILE_PATH, new TypeToken<List<State>>(){}.getType()));
        stateService = new StateService(stateRepository);

        IApartmentRepository apartmentRepository = new ApartmentRepository(
                new JSONStream<Apartment>(APARTMENTS_FILE_PATH, new TypeToken<List<Apartment>>(){}.getType()));
        apartmentService = new ApartmentService(apartmentRepository, userRepository);

        IAmenityRepository amenityRepository = new AmenityRepository(
                new JSONStream<Amenity>(AMENITIES_FILE_PATH, new TypeToken<List<Amenity>>(){}.getType()));
        amenityService = new AmenityService(amenityRepository, apartmentRepository);

        reservationService = new ReservationService(userService, apartmentService);

        userService.setApartmentRepository(apartmentRepository);

        imageUpload = new ImageUpload(IMAGE_UPLOAD_FOLDER_PATH);

        IHolidayRepository holidayRepository = new HolidayRepository(
                new JSONStream<Holiday>(HOLIDAYS_FILE_PATH, new TypeToken<List<Holiday>>(){}.getType()));

        holidayService = new HolidayService(holidayRepository);

    }


}

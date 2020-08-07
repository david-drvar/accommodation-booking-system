package rest;

import com.google.gson.Gson;
import ws.WsHandler;

import java.io.File;

import static spark.Spark.*;

public class Main {

    private static Gson g = new Gson();

    public static void main(String[] args) throws Exception {

        port(8088);

        webSocket("/ws", WsHandler.class);

        staticFiles.externalLocation(new File("./static").getCanonicalPath());

        get("/rest/demo/test", (req, res) -> {
            return "Works IntelliJ!";
        });
    }
}

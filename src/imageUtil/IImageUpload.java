package imageUtil;

import spark.Request;
import spark.Response;

import javax.servlet.ServletException;
import java.io.IOException;

public interface IImageUpload {
    void uploadImage(Request req) throws IOException, ServletException;
}

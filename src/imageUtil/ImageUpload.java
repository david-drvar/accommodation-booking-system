package imageUtil;

import spark.Request;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.util.Collection;

public class ImageUpload implements IImageUpload {

    private final String folderPath;

    public ImageUpload(String folderPath) {
        this.folderPath = getAbsolutePath(folderPath);
    }

    private String getAbsolutePath(String relativePath) {
        File file = new File(relativePath);
        return file.getAbsolutePath();
    }

    @Override
    public void uploadImage(Request req) throws IOException, ServletException {
        configureRequest(req);
        Collection<Part> parts =  req.raw().getParts();
        for(Part part : parts) {
            String fileName = getFileName(part);
            if(fileName != null)
                part.write(fileName);
        }
    }

    private void configureRequest(Request req) {
        MultipartConfigElement config = new MultipartConfigElement(folderPath);
        req.raw().setAttribute("org.eclipse.jetty.multipartConfig", config);
    }

    private String getFileName(Part part) {
        String contentDisposition = part.getHeader("content-disposition");
        String[] tokens = contentDisposition.split(";");
        for(String token : tokens) {
            if(token.trim().startsWith("filename"))
                return token.substring(token.indexOf("=") + 2, token.length() - 1);
        }
        return null;
    }
}

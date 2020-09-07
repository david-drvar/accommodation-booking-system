package dto;

import beans.UserType;

public class JwtDTO {
    private long id;
    private UserType userType;

    public JwtDTO() {
    }

    public long getId() {
        return id;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }
}

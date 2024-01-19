package reading.project.domain.auth.user;

public interface OAuth2UserInfo {
    String getProvider();
    String getUsername();
    String getPassword();
    String getEmail();
    String getName();
}

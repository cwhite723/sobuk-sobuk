package reading.project.global.config.redis.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import reading.project.domain.auth.jwt.JwtTokenizer;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisDao {
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;

    private final RedisTemplate<String,String> redisBlackListTemplate;


    public void setValues(String key, String data) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data,jwtTokenizer.getRefreshTokenExpirationMinutes());
    }

    public void setValues(String key, String data, Duration duration) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data, duration);
    }

    public String getValues(String key) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(key);
    }

    public void deleteValues(String key) {
        redisTemplate.delete(key);
    }

    public void setValueBlackList(String key,String value,Long minute) {
        redisBlackListTemplate.opsForValue().set(key,value,minute, TimeUnit.MINUTES);
    }

    public String getBlackValues(String key) {
        ValueOperations<String, String> values = redisBlackListTemplate.opsForValue();
        return values.get(key);
    }

    public boolean hashKeyBlackList(String key) {
        if(getBlackValues(key) != null && getBlackValues(key).equals("access_token")) return true;
        else return false;
    }
}
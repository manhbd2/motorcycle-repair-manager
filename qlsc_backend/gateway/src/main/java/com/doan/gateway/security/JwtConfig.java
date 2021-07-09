package com.doan.gateway.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

@Getter
@Setter
public class JwtConfig {

    @Value("${security.jwt.uri:/auth/**}")
    private String uri;

    @Value("${security.jwt.header:X-APP-PAGE-TOKEN}")
    private String header;

    @Value("${security.jwt.prefix:Bearer }")
    private String prefix;

    @Value("${security.jwt.expiration:#{24*60*60}}")
    private int expiration;

    @Value("${security.jwt.secret:JwtSecretKey}")
    private String secret;

}

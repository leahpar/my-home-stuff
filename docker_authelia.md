# Authelia

> Dépend de [redis](docker_redis.md)

## Installation

```bash
docker run -d \
    --name authelia \
    --restart=unless-stopped \
    --network=host \
    -e TZ=Europe/Paris \
    -v /home/pi/authelia/config:/config \
    authelia/authelia
```

## Configuration auth dans Nginx

> [NPM](docker_nginx_proxy_manager.md)

```nginx
location /authelia {
    internal;
    #set $upstream_authelia http://auth.local:9091/api/verify?auth=basic;
    set $upstream_authelia http://auth.local:9091/api/verify;
    proxy_pass_request_body off;
    proxy_pass $upstream_authelia;
    proxy_set_header Content-Length "";
 
    # Timeout if the real server is dead
    proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
    client_body_buffer_size 128k;
    proxy_set_header Host $host;
    proxy_set_header X-Original-URL $scheme://$http_host$request_uri;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr; 
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_set_header X-Forwarded-Uri $request_uri;
    proxy_set_header X-Forwarded-Ssl on;
    proxy_redirect  http://  $scheme://;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_cache_bypass $cookie_session;
    proxy_no_cache $cookie_session;
    proxy_buffers 4 32k;
 
    send_timeout 5m;
    proxy_read_timeout 240;
    proxy_send_timeout 240;
    proxy_connect_timeout 240;
}
 
location / {
    set $upstream_homer http://transmission.local:9091;
    proxy_pass $upstream_homer;
    #proxy_set_header Proxy-Authorization $http_authorization;

    auth_request /authelia;
    auth_request_set $target_url $scheme://$http_host$request_uri;
    auth_request_set $user $upstream_http_remote_user;
    auth_request_set $groups $upstream_http_remote_groups;
    proxy_set_header Remote-User $user;
    proxy_set_header Remote-Groups $groups;
    error_page 401 =302 https://auth.appart.42p.ovh/?rd=$target_url;

    client_body_buffer_size 128k;

    proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;

    send_timeout 5m;
    proxy_read_timeout 360;
    proxy_send_timeout 360;
    proxy_connect_timeout 360;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_set_header X-Forwarded-Uri $request_uri;
    proxy_set_header X-Forwarded-Ssl on;
    proxy_redirect  http://  $scheme://;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_cache_bypass $cookie_session;
    proxy_no_cache $cookie_session;
    proxy_buffers 64 256k;

    set_real_ip_from 10.0.0.0/16;
    real_ip_header X-Forwarded-For;
    real_ip_recursive on;
}
```

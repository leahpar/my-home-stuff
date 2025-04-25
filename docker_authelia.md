# Authelia

> Dépend de [NPM](docker_nginx_proxy_manager.md) et [redis](docker_redis.md)

```bash
docker run -d \
    --name authelia \
    --restart=unless-stopped \
    --network=host \
    -e TZ=Europe/Paris \
    -v /home/pi/authelia/config:/config \
    authelia/authelia
```

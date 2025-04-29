# Nginx Proxy Manager

> Dépend de [Redis](docker_redis.md)

```bash
docker run -d \
    --name authelia \
    --restart=unless-stopped \
    --network=host \
    -e TZ=Europe/Paris \
    -v /home/pi/authelia/config:/config \
    authelia/authelia
```

# Authelia

> Dépendances : Redis

```bash
docker run -d \
    --name authelia \
    --restart=unless-stopped \
    --network=host \
    -e TZ=Europe/Paris \
    -v /home/pi/authelia/config:/config \
    authelia/authelia
```

# Sonarr

https://hub.docker.com/r/linuxserver/sonarr

```bash
docker run -d \
    --name=sonarr \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Europe/Paris \
    -p 8989:8989 \
    -v /home/pi/sonarr:/config \
    -v /home/pi/data/series:/tv \
    -v /home/pi/data/downloads:/downloads \
    --restart unless-stopped \
    lscr.io/linuxserver/sonarr:latest
```

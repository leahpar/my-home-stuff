# Radarr

https://hub.docker.com/r/linuxserver/radarr

```bash
docker run -d \
    --name=radarr \
    --restart unless-stopped \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Europe/Paris \
    -p 7878:7878 \
    -v /home/pi/radarr/data:/config \
    -v /home/pi/data/movies:/movies \
    -v /home/pi/data/downloads:/downloads \
    lscr.io/linuxserver/radarr:latest
```

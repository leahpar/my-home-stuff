# Bazarr

https://hub.docker.com/r/linuxserver/bazarr

```bash
docker run -d \
    --name=bazarr \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Europe/Paris \
    -p 6767:6767 \
    -v /home/pi/bazarr:/config \
    -v /home/pi/data/movies:/movies \
    -v /home/pi/data/series:/tv \
    --restart unless-stopped \
    lscr.io/linuxserver/bazarr:latest
```

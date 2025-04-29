# Transmission

https://hub.docker.com/r/linuxserver/transmission

```bash
docker run -d \
    --name transmission \
    --restart=unless-stopped \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Europe/Paris \
    -p 9091:9091 \
    -p 51413:51413 \
    -p 51413:51413/udp \
    -v /home/pi/transmission/data:/config \
    -v /home/pi/data/downloads:/downloads \
    -v /home/pi/transmission-watch:/watch \
    lscr.io/linuxserver/transmission:latest
```

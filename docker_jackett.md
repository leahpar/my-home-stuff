# Jackett

https://hub.docker.com/r/linuxserver/jackett

```bash
docker run -d \
    --name=jackett \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Europe/Paris \
    -e AUTO_UPDATE=true \
    -p 9117:9117 \
    -v /home/pi/jackett:/config \
    -v /path/to/blackhole:/downloads \
    --restart unless-stopped \
    lscr.io/linuxserver/jackett:latest
```

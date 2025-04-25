# Jellyfin

```bash
docker run -d  \
  --name=jellyfin \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/Paris \
  -p 8096:8096 \
  -p 7359:7359/udp \
  -p 1900:1900/udp \
  -v /home/pi/jellyfin:/config \
  -v /home/pi/data/movies:/data/movies \
  -v /home/pi/data/series:/data/tvshows \
  --restart unless-stopped \
  lscr.io/linuxserver/jellyfin:latest
```


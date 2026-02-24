# Jellyfin

```bash
docker run \
  --name jellyseerr \
  --restart=unless-stopped \
  --init \
  --user=1000:1000 \
  -e PUID=1000 -e PGID=1000 \
  -e TZ=Europe/Paris \
  -p 5055:5055 \
  -v /home/pi/jellyseerr/config:/app/config \
  ghcr.io/fallenbagel/jellyseerr:latest
```

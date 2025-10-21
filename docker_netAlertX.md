# NetAlertX

```bash
docker run -d --rm \
  --network=host \
  --name=netalert \
  --restart=unless-stopped \
  -v /home/pi/netalert/config:/app/config \
  -v /home/pi/netalert/db:/app/db \
  --mount type=tmpfs,target=/app/api \
  -e PUID=1000 -e PGID=1000 \
  -e TZ=Europe/Paris \
  -e PORT=20211 \
	ghcr.io/jokob-sk/netalertx:latest
```

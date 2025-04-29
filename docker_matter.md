# HomeAssistant - Matter

> (wip) pas encore stable

```bash
docker run -d \
  --name matter-server \
  --restart=unless-stopped \
  -e TZ=Europe/Paris \
  -v /home/pi/hassmatter:/data \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  ghcr.io/home-assistant-libs/python-matter-server:stable
```

# Home Assistant

```bash
docker run -d \
    --name homeassistant \
    --privileged \
    --restart=unless-stopped \
    -e TZ=Europe/Paris \
    -v /home/pi/hassconfig:/config \
    --network=host \
    ghcr.io/home-assistant/raspberrypi4-homeassistant:stable
```

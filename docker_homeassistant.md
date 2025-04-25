# Home Assistant


```bash
docker run -d \
    --name homeassistant \
    --privileged \
    --restart=unless-stopped \
    -e TZ=Europe/Paris \
    -v /home/pi/hassconfig:/config \
    --network=host \
    ghcr.io/home-assistant/raspberrypi3-homeassistant:stable
```

## HomeAssistant - Matter

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

## zigbee2mqtt

```bash
docker run -d \
    --name zigbee2mqtt \
    -v /home/pi/zigbee2mqtt/data:/app/data \
    -v /run/udev:/run/udev:ro \
    --device=/dev/ttyACM0 \
    --user 1000:1000 \
    -p 8081:8081 \
    --restart=unless-stopped \
    --group-add dialout \
    -e TZ=Europe/Paris \
    koenkk/zigbee2mqtt
```

## Mosquitto

cf [Mosquitto](docker_mosquitto.md)

# zigbee2mqtt

> Dépend de [Mosquitto](docker_mosquitto.md)

```bash
docker run -d \
    --name zigbee2mqtt \
    -v /home/pi/zigbee2mqtt/data:/app/data \
    --user 1000:1000 \
    -p 8081:8081 \
    --restart=unless-stopped \
    -e TZ=Europe/Paris \
    koenkk/zigbee2mqtt
```

> Ancienne version (clé zigbee USB)

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

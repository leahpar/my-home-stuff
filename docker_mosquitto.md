# Mosquitto

```bash
docker run -d \
    --name mosquitto \
    -p 1883:1883 \
    -v /home/pi/mosquitto:/mosquitto \
    -e TZ=Europe/Paris \
    --restart=unless-stopped \
    eclipse-mosquitto
```

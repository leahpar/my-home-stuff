# Redis

```bash
docker run -d \
    --name redis \
    --restart=unless-stopped \
    -p 6379:6379\
    -e TZ=Europe/Paris \
    --security-opt=seccomp=/home/pi/redis/seccomp.json \
    -v /home/pi/redis:/data \
    redis:alpine
```

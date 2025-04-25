# Uptime-kuma

https://github.com/louislam/uptime-kuma

```bash
docker run -d \
    --name uptime-kuma \
    -p 3001:3001 \
    -v /home/pi/uptime-kuma:/app/data \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -e PUID=1000 \
    -e PGID=1000 \
    -e TZ=Europe/Paris \
    --restart unless-stopped \
    louislam/uptime-kuma:latest
```

**Pour le monitoring des containers locaux :**

```bash
sudo chmod o+rw /var/run/docker.sock 
```

**Pour le monitoring des containers distants :**

cf [Docker proxy](docker_docker_proxy.md)

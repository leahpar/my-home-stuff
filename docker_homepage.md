# Homepage

```bash
docker run -d \
  --name homepage \
  -e PUID=1000 \
  -e PGID=995 \
  -e HOMEPAGE_ALLOWED_HOSTS=* \
  -p 3000:3000 \
  -v /home/pi/homepage:/app/config \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --restart unless-stopped \
  ghcr.io/gethomepage/homepage:latest
```

**Pour le monitoring des containers locaux :**

```bash
sudo chmod o+rw /var/run/docker.sock 
```

**Pour le monitoring des containers distants :**

cf [Docker proxy](docker_docker_proxy.md)

**Configuration :**

- [Settings](homepage/settings.yaml)
- [widgets](homepage/widgets.yaml)
- [Services](homepage/services.yaml)

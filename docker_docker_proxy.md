# Docker Proxy

```bash
docker run -d \
  --privileged \
  --name dockerproxy \
  -e PUID=1000 \
  -e PGID=995 \
  -e CONTAINERS=1 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 2375:2375 \
  --restart unless-stopped \
  tecnativa/docker-socket-proxy
```

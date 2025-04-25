# wireguard

https://markontech.com/linux/install-wireguard-vpn-server-with-docker/

https://hub.docker.com/r/linuxserver/wireguard

https://docs.linuxserver.io/images/docker-wireguard

```bash
docker run -d \
    --name wireguard \
    --restart=unless-stopped \
    --cap-add=NET_ADMIN \
    --cap-add=SYS_MODULE \
    -e PUID=1000 -e PGID=1000 \
    -e TZ=Europe/Paris \
    -e PEERS=raphael \
    -e PEERDNS=auto \
    -p 51820:51820/udp \
    -v /home/pi/wireguard:/config \
    -v /lib/modules:/lib/modules \
    --sysctl="net.ipv4.conf.all.src_valid_mark=1" \
    linuxserver/wireguard
```

```bash
docker exec -it wireguard /app/show-peer <peer>
```

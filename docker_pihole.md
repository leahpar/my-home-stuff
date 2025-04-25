# PiHole

https://github.com/pi-hole/docker-pi-hole/

```bash
IP=`ip route get 1 | head -1 | cut -d' ' -f7`
docker run -d \
    --name pihole \
    --restart=unless-stopped \
    -p 53:53/tcp -p 53:53/udp \
    -p 8082:80 \
    -e TZ=Europe/Paris \
    -v "/home/pi/pihole/etc-pihole/:/etc/pihole/" \
    -v "/home/pi/pihole/etc-dnsmasq.d/:/etc/dnsmasq.d/" \
    -e ServerIP="${IP}" \
    -e WEBPASSWORD="siSh0iek3sei" \
    -e PIHOLE_DNS_="1.1.1.1;8.8.8.8;8.8.4.4" \
    -e QUERY_LOGGING="false" \
    pihole/pihole:latest
```

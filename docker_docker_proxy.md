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

> PGID est le groupe `docker`

## Accès à l'API Docker locale

```bash
sudo chmod o+rw /var/run/docker.sock 
```

## ⚠️ Sécurisation de l'accès externe par filtrage IP

https://serverfault.com/questions/704643/steps-for-limiting-outside-connections-to-docker-container-with-iptables/933803#933803

```bash
# Supprimer les règles existantes
iptables -D DOCKER-USER -j RETURN
# Whitelist IP
iptables -A DOCKER-USER -i ens3 -s 93.8.158.175 -p tcp -m conntrack --ctorigdstport 2375 --ctdir ORIGINAL -j ACCEPT
iptables -A DOCKER-USER -i ens3 -p tcp -m conntrack --ctorigdstport 2375 --ctdir ORIGINAL -j DROP
```

tester

```bash
curl -X GET http://inara.ovh:2375/version
```

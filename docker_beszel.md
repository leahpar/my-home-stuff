# Beszel

## Serveur

```bash
docker run -d \
  --name=beszel \
  --restart unless-stopped \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/Paris \
  -v /home/pi/beszel:/beszel_data \
  -v /home/pi/beszel_socket:/beszel_socket \
  -e APP_URL=http://localhost:8090 \
  -p 8090:8090 \
  henrygd/beszel
```

`beszel_socket` : Socket pour la communication avec l'agent local

## Agents

### Binaire (VPS)

Clé SSH et token à récupérer dans l'interface web de Beszel

```bash
curl -sL https://get.beszel.dev \
    -o /tmp/install-agent.sh \
    && chmod +x /tmp/install-agent.sh \
    && /tmp/install-agent.sh \
    -p 45876 \
    -k "${BESZEL_SSHKEY}" \
    -t "${BESZEL_TOKEN}"
```

### Docker

> Agent pas en mode host (pas de monitoring réseau)
> cf https://beszel.dev/guide/agent-installation#why-host-network-mode si besoin

```bash
# AGENT
docker run -d \
  --name beszel-agent \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /mnt/dd-2t/.beszel:/extra-filesystems/dd2t:ro \
  -v /var/run/dbus/system_bus_socket:/var/run/dbus/system_bus_socket:ro \
  -v /home/pi/beszel_socket:/beszel_socket \
  -e KEY="${BESZEL_SSHKEY}" \
  -e TOKEN="${BESZEL_TOKEN}" \
  -e LISTEN=45876 \
  -p 45876:45876 \
  henrygd/beszel-agent:latest
```

Volumes optionnels suivant l'agent :
- `/var/run/docker.sock` : Monitoring des containers Docker
- `/mnt/dd-2t/.beszel` : Monitoring disques supplémentaires
- `/var/run/dbus/system_bus_socket` : Monitoring services systemd
- `/home/pi/beszel_socket` : Socket pour la communication avec le serveur Beszel local. => `-e LISTEN: /beszel_socket/beszel.sock`

